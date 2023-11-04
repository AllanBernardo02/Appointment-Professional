import BaseListPresenter from "../../../../base/BaseListPresenter";

class ConsultationPresenter extends BaseListPresenter {
  constructor(view, findObjectUseCase) {
    super(view, findObjectUseCase);
    this.view = view;
    this.findObjectUseCase = findObjectUseCase;
  }

  componentDidMount() {
    this.init();
    this.getObjects();
    this.getConsults();
  }

  init() {
    this.limit = 10;
    this.current = 1;
    this.where = {};
    this.objects = [];
    this.view.setObjects([]);
    this.view.setConsults([]);
  }

  async getObjects() {
    // const collection = this.view.getCollectionName();
    const collection = "patient";
    const user = this.view.getCurrentUser();
    const params = this.view.getParams();

    const skip = (this.current - 1) * this.limit;
    const query = {
      count: true,
      limit: this.limit,
      skip: skip,

      where: {
        ...this.where,
        id: params.id,
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

  async getConsults() {
    const collection = "patientConsultation";
    const user = this.view.getCurrentUser();
    const params = this.view.getParams();

    const skip = (this.current - 1) * this.limit;
    const query = {
      count: true,
      limit: this.limit,
      skip: skip,
      //   where: this.where,
      where: {
        createdBy: user.id,
        patientId: params.id,
      },

      include: ["all"],
      sort: { createdAt: -1 },
    };
    this.view.showProgress();
    try {
      const objects = await this.findObjectUseCase.execute(
        "patientConsultation",
        query
      );
      this.view.setConsults(objects);
    } catch (error) {
      this.view.showError(error);
    } finally {
      this.view.hideProgress();
    }
  }

  onClickAdd(objects) {
    const collection = "patientConsultation";

    this.view.navigateTo(`/add-consultation/${objects[0].id}`);
  }
  // objects.forEach((object) => {
  //   // const path = "/consultation-form/" + object.id;
  //   // const path = "/collection/" + collection + "/form/" + object.id;
  //   // const path = "/consultation-form/" + collection + "/form/:id";
  //   // this.view.navigateTo(path);
  //   this.view.navigateTo("/consultation-form/" + object.id);
  // });

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

  onClickItem(index, consult) {
    const object = consult[index];
    // const collection = this.view.getCollectionName();
    const params = this.view.getParams();
    this.view.navigateTo(`/consultation-form/${params.id}/${object.id}`);
  }
}

export default ConsultationPresenter;
