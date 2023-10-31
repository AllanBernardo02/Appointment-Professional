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
    // console.log(object, "The object");
    // console.log("collection", collection);
    // console.log("User", user);
    if (object.id) {
      this.change.id = object.id;
      this.change.acl = this.view.getAcl();
      console.log("acl", this.change.acl);
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
      this.view.showSuccess("Successfully saved!");
      this.view.navigateTo("/");
      this.view.setObject({});
    } catch (error) {
      this.view.hideProgress();
      this.view.showError(error);
    }
  }

  // getClose() {
  //   const collection = this.view.getCollectionName()
  //   const user = this.view.getCurrentUser()
  //   const query = {
  //     where: this.where,
  //     limit: this.limit
      
  //   }
  // }
}

export default CreateSchedulePresenter;
