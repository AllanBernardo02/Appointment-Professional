import BaseListPresenter from "../../../base/BaseListPresenter";

class AppoinmentPresenter extends BaseListPresenter {
  async getObjects() {
    const collection = this.view.getCollectionName();
    const user = this.view.getCurrentUser();
    const skip = (this.current - 1) * this.limit;
    const query = {
      limit: this.limit,
      skip: skip,
      where: this.where,
      //   where: {
      //     ...this.where,
      //     createdBy: user.id,
      //   },
      include: ["all"],
      sort: { createdAt: -1 },
    };
    this.view.showProgress();
    try {
      const objects = await this.findObjectUseCase.execute(collection, query);
      this.objects = this.objects.concat(objects);
      //   this.view.setTotal(this.objects.length);
      //   this.view.setCount(this.count);
      this.view.setObjects(this.objects);
      this.view.hideProgress();
    } catch (error) {
      this.view.hideProgress();
      this.view.showError(error);
    }
  }
}

export default AppoinmentPresenter;
