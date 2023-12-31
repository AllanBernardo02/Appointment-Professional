import BaseFormPresenter from "../../../../base/BaseFormPresenter";
import { useParams } from "react-router-dom";

class NewConsultationPresenter extends BaseFormPresenter {
      constructor(view, getObjectUseCase, upsertUseCase) {
        super(view, getObjectUseCase, upsertUseCase)
        this.view = view;
        this.getObjectUseCase = getObjectUseCase;
        this.upsertUseCase = upsertUseCase;
      }

  componentDidMount() {
    this.init();
    this.view.getObject();
  }

  init() {
    this.object = {};
    this.change = {}; // when data is change
  }

  //   async getObject() {
  //     const collection = this.view.getCollectionName();
  //     const id = this.view.getObjectId();
  //     if (id) {
  //       const params = { include: ["all"] };
  //       try {
  //         this.view.showProgress();
  //         const object = await this.getObjectUseCase.execute(collection, id, {
  //           params,
  //         });
  //         this.view.hideProgress();
  //         this.view.setObject(object);
  //       } catch (error) {
  //         this.view.hideProgress();
  //         this.view.showError(error);
  //       }
  //     }
  //   }

  // onChange(field, data) {
  //   this.change[field] = data;
  // }

  async save() {
    const collection = this.view.getCollectionName();
    const object = this.view.getObject();
    const user = this.view.getCurrentUser(); // new add
   
    // console.log(params, "THE PARAMS")
    console.log("object get", object);
    if (object.id) {
      this.change.id = object.id;
      console.log("this changessss", this.change);
    } else {
      this.change.acl = this.view.getAcl();
      this.change.createdBy = user.id; // new add
      this.change.patientId = this.view.getObjectId();
      console.log("this change", this.change);
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
      this.view.navigateBack();
    } catch (error) {
      this.view.hideProgress();
      this.view.showError(error);
    }
  }

  onClickBack() {
    // if (Object.values(this.change).length > 0) {
    //   const message =
    //     "You have unsaved changes that will be lost if you proceed. Are you sure you want to discard these changes?";
    //   this.view
    //     .showConfirmDialog(message, "Discard Changes", "DISCARD")
    //     .then(() => {
    //       this.view.navigateBack();
    //     })
    //     .catch(() => {});
    //   return;
    // }
    this.view.navigateBack();
  } 
}
export default NewConsultationPresenter;
