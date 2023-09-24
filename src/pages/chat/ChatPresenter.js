import BaseListPresenter from "../../base/BaseListPresenter";
import PubSub from "../../event/PubSub";

class ChatPresenter {
  constructor(view, findUseCase, saveObjectUseCase, updateObjectUseCase) {
    this.view = view;
    this.findUseCase = findUseCase;
    this.saveObjectUseCase = saveObjectUseCase;
    this.updateObjectUseCase = updateObjectUseCase;
    this.limit = 10;
    this.current = 1;
    // this.where = {
    //     type: 'MESSAGE'
    // };
    this.documents = [];
    this.subscriber = PubSub.createSubscriber();
  }

  componentDidMount() {
    this.getData();
    this.subscribe();
  }

  componentWillUnmount() {
    this.subscriber.unsubscribe("message");
  }

  subscribe() {
    const sender = this.view.getCurrentUser();
    this.subscriber.subscribe("message");
    this.subscriber.on("message", (channel, message) => {
      if (message.chat.participants.find((u) => u.id === sender.id)) {
        if (!this.documents.find((d) => d.id === message.chat.id)) {
          console.log("if...");

          this.documents.push(message.chat);

          this.view.setChats(this.documents);
        } else if (this.documents.find((d) => d.id === message.chat.id)) {
          console.log("else if....", this.documents);

          const updatedDocument = this.documents.map((d) => {
            if (d.id === message.chat.id) {
              return message.chat;
            } else {
              return d;
            }
          });

          this.documents = updatedDocument;

          console.log("documents after", this.documents);

          this.documents.sort(function (a, b) {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });

          // console.log("UPDATED DOC", updatedDocument);

          this.view.setChats(this.documents);
        }
      }
    });
  }

  getData() {
    const user = this.view.getCurrentUser();
    const skip = (this.current - 1) * this.limit;
    const query = {
      count: true,
      limit: this.limit,
      skip,
      include: ["all"],
      sort: { updatedAt: -1 },
      where: { participants: [{ id: user.id }] },
    };
    this.view.showProgress();
    return this.findUseCase
      .execute("chats", query)
      .then((objects) => {
        this.documents = this.documents.concat(objects);

        // this.view.setCount(count);
        this.view.setChats(this.documents);
        this.view.hideProgress();
      })
      .catch((error) => {
        this.view.hideProgress();
        this.view.showError(error);
      });
  }

  getChats() {
    const user = this.view.getCurrentUser();
    const query = {
      where: {
        participants: { id: user.id },
        sort: { createdAt: -1 },
      },
      include: ["participants"],
    };
    this.view.showProgress();
    return this.findUseCase
      .execute("chats", query)
      .then((chats) => {
        this.view.setChats(chats);
      })
      .catch((error) => {
        this.view.hideProgress();
        this.view.showError(error);
      });
  }

  getMessages() {
    if (this.chat) {
      const query = {
        where: { chat: { id: this.chat.id } },
        include: ["sender"],
      };
      return this.findObjectUseCase
        .execute("messages", query)
        .then((messages) => {
          this.view.setMessages(messages);
        })
        .catch((error) => {
          this.view.hideProgress();
          this.view.showError(error);
        });
    }
  }

  onClickChat(chat) {
    if (chat.id) {
      chat.seen = true;
      this.updateObjectUseCase.execute("chats", chat).then((res) => {
        console.log("seen updated FROM CHAT PAGE", res);
      });
    }

    this.view.navigateTo("/message", chat);
  }

  onFocusSearch() {
    this.view.navigateTo("/chat/user");
  }

  loadMore() {
    if (!this.view.state.progress) {
      this.current++;
      this.getData();
    }
  }
}

export default ChatPresenter;
