import BaseListPresenter from "../../../../base/BaseListPresenter";

class ViewPresenter extends BaseListPresenter {
  constructor(view, findObjectUseCase) {
    super(view, findObjectUseCase);
    this.view = view;
    this.findObjectUseCase = findObjectUseCase;
  }

  componentDidMount() {
    this.init();
    this.getObjects();
  }

  init() {
    this.limit = 10;
    this.current = 1;
    this.where = {};
    this.objects = [];
    // this.view.setObjects([]);
    // this.view.setSelected([]);
  }

  async getObjects() {
    const collection = this.view.getCollectionName();
    const user = this.view.getCurrentUser();
    const skip = (this.current - 1) * this.limit;
    const query = {
      count: true,
      limit: this.limit,
      skip: skip,
      //   where: this.where,
      where: this.where,
      include: ["all"],
      sort: { createdAt: -1 },
    };
    this.view.showProgress();
    try {
      const objects = await this.findObjectUseCase.execute(
        collection,
        query
      );
      this.objects = this.objects.concat(objects);
      this.view.setObjects(this.objects);
    } catch (error) {
      this.view.showError(error);
    } finally {
      this.view.hideProgress();
    }
  }
}

export default ViewPresenter;
