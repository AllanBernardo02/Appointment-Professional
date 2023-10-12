import BaseListPresenter from "../../base/BaseListPresenter";

class ChatUserPresenter {
  constructor(view, findObjectUseCase) {
    this.view = view;
    this.findObjectUseCase = findObjectUseCase;
    this.limit = 10;
    this.current = 1;
    this.where = {};
    this.documents = [];
    this.progress = false;
  }

  componentDidMount() {
    // this.getData();
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
}

export default ChatUserPresenter;
