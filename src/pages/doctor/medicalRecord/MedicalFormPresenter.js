import BaseFormPage from "../../../base/BaseFormPage";
import BaseFormPresenter from "../../../base/BaseFormPresenter";
import BaseListPresenter from "../../../base/BaseListPresenter";

class MedicalFormPresenter extends BaseFormPresenter {
  async save() {
    const collection = this.view.getCollectionName();
    const object = this.view.getObject();
    const user = this.view.getCurrentUser(); // new add
    console.log("object get", object);
    if (object.id) {
      this.change.id = object.id;
      console.log("this changessss", this.change);
    } else {
      this.change.acl = this.view.getAcl();
      this.change.createdBy = user.id; // new add
      console.log("this change", this.change);
    }
    try {
      await this.upsertUseCase.execute(collection, this.change);
    } catch (error) {
      throw error; // rethrow the error to be caught by the caller
    }
  }
}

export default MedicalFormPresenter;
