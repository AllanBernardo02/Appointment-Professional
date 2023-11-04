import BaseListPresenter from "../../../base/BaseListPresenter";

class ContractTemplatePresenter extends BaseListPresenter {
  constructor(view, findObjectUseCase) {
    super(view, findObjectUseCase);
    this.view = view;
    this.findObjectUseCase = findObjectUseCase;
  }

  init() {
    this.limit = 10;
    this.current = 1;
    this.where = {};
    this.objects = [];
  }

  componentDidMount() {
    this.init();
    this.getContracts();
  }

  async getContracts() {
    const collection = this.view.getCollectionName();
    // console.log("collection", collection);
    const skip = (this.current - 1) * this.limit;
    const params = this.view.getParams();
    console.log("params", params);
    const query = {
      limit: this.limit,
      skip: skip,
      where: {
        id: params.id,
      },
      include: ["all"],
      sort: { createdAt: -1 },
    };

    console.log("query", query);
    this.view.showProgress();
    try {
      const objects = await this.findObjectUseCase.execute(collection, query);
      this.view.setContracts(objects);
    } catch (error) {
      this.view.showError(error);
    } finally {
      this.view.hideProgress();
    }
  }

  onClickExport() {
    this.view.exportPDF();
  }
}

export default ContractTemplatePresenter;
