import BaseListPresenter from "../../../../base/BaseListPresenter";

class ViewPresenter extends BaseListPresenter {
  async getObjects() {
    const collection = this.view.getCollectionName();
    const user = this.view.getCurrentUser();
    const skip = (this.current - 1) * this.limit;
    const query = {
      count: true,
      limit: this.limit,
      skip: skip,
      //   where: this.where,
      where: {
        ...this.where,
        createdBy: user.id,
      },
      include: ["all"],
      sort: { createdAt: -1 },
    };
    this.view.showProgress();
    try {
      const { count, objects } = await this.findObjectUseCase.execute(
        collection,
        query
      );
      this.objects = this.objects.concat(objects);
      this.view.setCount(count);
      this.view.setObjects(this.objects);
    } catch (error) {
      this.view.showError(error);
    } finally {
      this.view.hideProgress();
    }
  }
}

export default ViewPresenter;
