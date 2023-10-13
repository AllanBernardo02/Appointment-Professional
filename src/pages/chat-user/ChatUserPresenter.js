import BaseListPresenter from "../../base/BaseListPresenter";
import Queue from "nq";
import PubSub from "../../event/PubSub";

class ChatUserPresenter {
  constructor(view, findObjectUseCase) {
    this.view = view;
    this.findObjectUseCase = findObjectUseCase;
    this.subscriber = PubSub.createSubscriber();
    this.limit = 10;
    this.current = 1;
    this.where = {};
    this.documents = [];
    this.progress = false;
    this.change = {};
    this.chat = {};
  }

  componentDidMount() {
    // this.getData();
    this.view.showProgress();
    Promise.resolve()
      // .then(() => this.getChat())
      .then(() => this.subscribe())
      .then(() => this.view.hideProgress())
      .catch((error) => {
        this.view.hideProgress();
        this.view.showError(error);
      });
    Queue.LiveQuery.on("open", () => {
      console.log("connected");
    });
    Queue.LiveQuery.on("close", () => {
      console.log("closed");
    });
  }

  componentWillUnmount() {
    this.subscriber.unsubscribe("message");
  }

  onChange(value, field) {
    this.change[field] = value;
  }

  getData() {
    const skip = (this.current - 1) * this.limit;
    const query = {
      count: true,
      limit: this.limit,
      skip,
      where: this.where,
      include: ["all"],
    };
    this.view.showProgress();
    this.progress = true;
    this.findObjectUseCase
      .execute("users", query)
      .then((objects) => {
        this.documents = this.documents.concat(objects);
        console.log("Users p", this.documents);
        // this.view.setCount(count);
        this.view.setUsers(this.documents);
        this.view.hideProgress();
        this.progress = false;
      })
      .catch((error) => {
        this.progress = false;
        this.view.hideProgress();
        this.view.showError(error);
      });
  }

  onClickUser(receiver) {
    const sender = this.view.getCurrentUser();
    console.log("the sender", sender);
    const participants = [sender, receiver];
    const query = {
      where: { participants: [{ id: sender.id }, { id: receiver.id }] },
      include: ["participants"],
      all: true,
    };
    this.findObjectUseCase
      .execute("chats", query)
      .then(([chat]) => {
        if (!chat) {
          chat = { participants };
        }
        this.view.navigateTo("/message", chat, { replace: true });
      })
      .catch((error) => {
        this.view.hideProgress();
        this.view.showError(error);
      });
  }

  onSubmitSearch(word) {
    // const or = [];
    // or.push({ firstName: { $regex: word, $options: "i" } });
    // or.push({ username: { $regex: word, $options: "i" } });
    this.where = {
      $or: [
        { firstName: { $regex: word, $options: "i" } },
        { username: { $regex: word, $options: "i" } },
      ],
    };
    this.documents = [];
    this.current = 1;
    this.getData();
  }

  loadMore() {
    if (!this.progress) {
      this.current++;
      this.getData();
    }
  }

  onSubmitMessage() {
    const message = this.view.getMessage();
    message.chat = this.chat;
    this.view.setMessage({});
    this.saveMessage(message);
  }

  saveMessage(message) {
    // update content of the chat
    if (message.chat.id) {
      message.chat.updatedAt = new Date().toISOString();
      message.chat.content = message.content;
      message.chat.seen = false;
      this.updateObjectUseCase.execute("chats", message.chat).then((res) => {
        console.log("content udpated ", res);
      });
    }

    const access = this.chat.participants.map((i) => i.id);
    access.push("role:admin");
    const sender = this.view.getCurrentUser();
    message.sender = sender;
    message.chat.initiator = sender;
    message.chat.content = message.content;
    message.chat.acl = {
      read: access,
      write: this.chat.participants.map((i) => i.id),
    };
    message.acl = {
      read: access,
      write: this.chat.participants.map((i) => i.id),
    };

    // wait after chat is created
    if (this.delay) return;
    // check if no chat is created
    if (!message.chat.id) {
      this.delay = true;
    }
    this.saveObjectUseCase
      .execute("messages", message)
      .then((message) => {
        this.chat = message.chat;
        if (this.delay) {
          this.delay = false;
          // navigate to new message to have chat id
          this.view.navigateTo("/message", message.chat, { replace: true });
        }
        const messages = this.view.getMessages();
        messages.push(message);
        this.view.setMessages(messages);
      })
      .then(() => {
        this.delay = false;
      })
      .catch((error) => {
        this.view.hideProgress();
        this.view.showError(error);
      });
  }

  subscribe() {
    const sender = this.view.getCurrentUser();
    this.subscriber.subscribe("message");
    this.subscriber.on("message", (channel, message) => {
      if (message?.chat?.id) {
        if (sender.id !== message.chat.initiator.id) {
          message.chat.seen = true;
        }

        this.updateObjectUseCase.execute("chats", message.chat).then((res) => {
          console.log("seen updated", res);
        });
      }

      console.log("SSSS1", message);
      console.log(
        "SSS2",
        message.chat.id === this.chat.id && message.sender.id !== sender.id
      );
      if (message.chat.id === this.chat.id && message.sender.id !== sender.id) {
        const messages = this.view.getMessages();
        messages.push(message);
        this.view.setMessages(messages);
      }
    });
  }
}

export default ChatUserPresenter;
