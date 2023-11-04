import BaseListPresenter from "../../../base/BaseListPresenter";

class ViewContractPresenter {
  constructor(view, findObjectUseCase) {
    this.view = view;
    this.findObjectUseCase = findObjectUseCase;
  }
  componentDidMount() {
    this.init();
    this.getContract();
  }
  init() {
    this.limit = 10;
    this.current = 1;
    this.where = {};
    this.objects = [];
  }
  async getContract() {
    const collection = this.view.getCollectionName();
    console.log("collection", collection);
    const skip = (this.current - 1) * this.limit;
    const query = {
      limit: this.limit,
      skip: skip,
      where: this.where,
      include: ["all"],
      sort: { createdAt: -1 },
    };
    this.view.showProgress();
    try {
      const objects = await this.findObjectUseCase.execute(collection, query);
      this.objects = this.objects.concat(objects);
      console.log(this.objects, "the objects");
      this.view.setContracts(this.objects);
    } catch (error) {
      this.view.showError(error);
    } finally {
      this.view.hideProgress();
    }
  }
}

export default ViewContractPresenter;
