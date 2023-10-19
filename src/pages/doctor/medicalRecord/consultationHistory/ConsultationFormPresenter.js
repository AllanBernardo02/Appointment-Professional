import BaseFormPresenter from "../../../../base/BaseFormPresenter";

class ConsultationFormPresenter extends BaseFormPresenter {
  constructor(view, getObjectUseCase, upsertUseCase) {
    super(view, getObjectUseCase, upsertUseCase);
    this.view = view;
    this.getObjectUseCase = getObjectUseCase;
    this.upsertUseCase = upsertUseCase;
  }

  componentDidMount() {
    this.init();
    this.getObject();
  }

  init() {
    this.object = {};
    this.change = {}; // when data is change
  }

  async getObject() {
    const collection = this.view.getCollectionName();
    const id = this.view.getObjectId();
    if (id) {
      const params = { include: ["all"] };
      try {
        this.view.showProgress();
        const object = await this.getObjectUseCase.execute(collection, id, {
          params,
        });
        console.log("getter object", object);
        this.view.hideProgress();
        this.view.setObject(object);
      } catch (error) {
        this.view.hideProgress();
        this.view.showError(error);
      }
    }
  }

  async save() {
    const collection = this.view.getCollectionName();
    const object = this.view.getObject();
    const user = this.view.getCurrentUser(); // new add
    const params = this.view.getParams();
    console.log("object get", object);
    console.log("params", params);
    console.log("change", this.change);
    // if (object.id) {
    //   this.change.id = object.id;
    // } else {
    //   this.change.acl = this.view.getAcl();
    // }
    if (object.id) {
      this.change.id = object.id;
      this.change.acl = this.view.getAcl();
      console.log("this changessss", this.change);
    } else {
      this.change.acl = this.view.getAcl();
      this.change.createdBy = user.id; // new add
      this.change.patientId = params.id;
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
      this.view.showSucces("Successfull saved!");
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
export default ConsultationFormPresenter;
