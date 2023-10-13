import Queue from "nq";
import PubSub from "../../event/PubSub";

class ChatMessagePresenter {
  constructor(
    view,
    findObjectUseCase,
    saveObjectUseCase,
    updateObjectUseCase,
    saveFileUseCase
  ) {
    this.view = view;
    this.findObjectUseCase = findObjectUseCase;
    this.saveObjectUseCase = saveObjectUseCase;
    this.updateObjectUseCase = updateObjectUseCase;
    this.saveFileUseCase = saveFileUseCase;
    this.subscriber = PubSub.createSubscriber();
    this.chat = {};
    this.change = {};
  }

  componentDidMount() {
    this.view.showProgress();
    Promise.resolve()
      .then(() => this.getChat())
      .then(() => this.getMessages())
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

  getChat() {
    this.chat = this.view.getChat();
    this.view.setChat(this.chat);
    if (!this.chat) {
      const id = this.view.getChatId();
      const query = {
        where: { id: id },
        include: ["all"],
      };
      return this.findObjectUseCase.execute("chats", query).then(([chat]) => {
        this.chat = chat;
        this.view.setChat(this.chat);
      });
    }
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

  getMessages() {
    if (this.chat) {
      const query = {
        where: { chat: { id: this.chat.id } },
        include: ["all"],
      };
      return this.findObjectUseCase
        .execute("messages", query)
        .then((messages) => {
          console.log("real", messages);
          this.view.setMessages(messages);
        })
        .catch((error) => {
          this.view.hideProgress();
          this.view.showError(error);
        });
    }
  }

  onClickBack() {
    this.view.navigateBack();
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
  onClickAttachment(file) {
    this.saveFileUseCase.execute(file).then((result) => {
      const message = {};
      message.chat = this.chat;
      message.attachment = result.url;
      this.saveMessage(message);
    });
  }

  closeClick() {
    this.view
      .showDialog({
        title: "close ticket",
        message: "do you want to close ticket?",
      })
      .then(() => {
        this.chat.status = "CLOSED";
        this.updateObjectUseCase.execute("chats", this.chat).then(() => {
          this.closeTicketSuccess();
        });
      });
  }

  closeTicketSuccess() {
    this.view.showSuccess("ticket successfully closed").then(() => {
      this.view.navigateTo("/support");
    });
  }

  onChange(value, field) {
    this.change[field] = value
  }
}

export default ChatMessagePresenter;
