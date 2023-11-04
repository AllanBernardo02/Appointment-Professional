import BaseFormPresenter from "../../../base/BaseFormPresenter";

class ContractPresenter extends BaseFormPresenter {
  async submit() {
    if (Object.values(this.change).length === 0) {
      this.view.navigateBack();
      return;
    }
    try {
      this.view.showProgress();
      await this.save();
      this.view.hideProgress();
      this.view.showSuccessSnackbar("Contract Details successfully saved!");
      this.view.navigateBack();
    } catch (error) {
      this.view.hideProgress();
      this.view.showError(error);
    }
  }

  async save() {
    const collection = this.view.getCollectionName();
    const object = this.view.getObject();
    const user = this.view.getCurrentUser();
    if (object.id) {
      this.change.id = object.id;
    } else {
      this.change.acl = this.view.getAcl();
    }
    try {
      await this.upsertUseCase.execute(collection, this.change);
    } catch (error) {
      throw error;
    }
  }
}

export default ContractPresenter;
