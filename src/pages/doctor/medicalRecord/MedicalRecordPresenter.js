import BaseFormPresenter from "../../../base/BaseFormPresenter";
import BaseListPresenter from "../../../base/BaseListPresenter";

class MedicalRecordPresenter extends BaseListPresenter {
  async getObjects() {
    const collection = this.view.getCollectionName();
    const user = this.view.getCurrentUser();
    // this.where.user = this.where.user || {};
    // this.where.user.id = user.id;
    console.log("User haha", user.id);
    // const collection = "patient";
    const skip = (this.current - 1) * this.limit;
    const query = {
      count: true,
      limit: this.limit,
      skip: skip,
      // where: this.where,
      where: {
        ...this.where,
        createdBy: user.id,
      },
      include: ["all"],
      sort: { createdAt: -1 },
    };
    this.view.showProgress();
    try {
      const objects = await this.findObjectUseCase.execute(collection, query);
      this.objects = this.objects.concat(objects);
      // this.view.setCount(count);
      this.view.setObjects(this.objects);
    } catch (error) {
      this.view.showError(error);
    } finally {
      this.view.hideProgress();
    }
  }

  onClickAdd() {
    const collection = this.view.getCollectionName();
    this.view.navigateTo("/medical-form");
  }
}

export default MedicalRecordPresenter;
