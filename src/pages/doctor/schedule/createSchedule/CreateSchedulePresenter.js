import BaseFormPresenter from "../../../../base/BaseFormPresenter";

class CreateSchedulePresenter extends BaseFormPresenter {
  async getObject() {
    // const collection = this.view.getCollectionName();
    // const id = this.view.getObjectId();
    // console.log("getobjectId", id);
    // if (id) {
    //   const params = { include: ["all"] };
    //   try {
    //     this.view.showProgress();
    //     const object = await this.getObjectUseCase.execute(collection, id, {
    //       params,
    //     });
    //     this.view.hideProgress();
    //     this.view.setObject(object);
    //   } catch (error) {
    //     this.view.hideProgress();
    //     this.view.showError(error);
    //   }
    // }
  }

  async save() {
    const collection = this.view.getCollectionName();
    const user = this.view.getCurrentUser();
    const object = this.view.getObject();
    if (object.id) {
      this.change.id = object.id;
    } else {
      this.change.acl = this.view.getAcl();
      this.change.createdBy = user.id; // new add
    }
    try {
      await this.upsertUseCase.execute(collection, this.change);
    } catch (error) {
      throw error; // rethrow the error to be caught by the caller
    }
  }

  async submit() {
    if (Object.values(this.change).length === 0) {
      this.view.navigateBack();
      return;
    }
    try {
      this.view.showProgress();
      await this.save();
      this.view.hideProgress();
      this.view.showSuccessSnackbar("Successfully saved!");
      // this.view.navigateBack();
      this.view.setObject({});
    } catch (error) {
      this.view.hideProgress();
      this.view.showError(error);
    }
  }
}

export default CreateSchedulePresenter;
