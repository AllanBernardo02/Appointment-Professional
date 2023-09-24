import React from "react";
import BasePage from "../../../../base/BasePage";
import withRouter from "../../../../withRouter";
import ConsultationPresenter from "./ConsultationPresenter";
import { findObjectUseCase } from "../../../../usecases/object";
import dateFormat from "../../../../dateFormat";
import NavBar from "../../../../components/navbar";
import { Button, Table } from "nq-component";

class ConsultationPage extends BasePage {
  constructor(props) {
    super(props);
    this.presenter = new ConsultationPresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
      consults: [],
    };
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  // getCollectionName() {
  //   return "patient";
  // }

  setObjects(objects) {
    this.setState({ objects });
  }

  setConsults(consults) {
    this.setState({ consults });
  }

  setCount(count) {
    this.setState({ count });
  }

  setCounts(count) {
    this.setState({ count });
  }

  calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  }

  onClickBack() {
    this.navigateBack();
  }

  onClickAdd(object) {
    console.log("llll", object);
    this.presenter.onClickAdd(object);
  }

  render() {
    const objects = this.state.objects;
    const consult = this.state.consults;

    const schema = this.getSchema("patientConsultation");

    console.log("get naba?", consult);
    return (
      <>
        <NavBar />
        <div className="overflow-auto">
          <div className="p-3 p-lg-4">
            <h2 className="fw-bold mt-3 text-capitalize">
              Consultation History
            </h2>
            {objects.map((object, index) => (
              <div key={index} className="m-5">
                <div className="d-flex">
                  <div>
                    {object && object["profile"] && (
                      <img
                        style={{ width: "130px", height: "130px" }}
                        src={object["profile"]}
                        alt=""
                      />
                    )}
                    {!object ||
                      (!object["profile"] && (
                        <i className="bi bi-person-circle fs-1"></i>
                      ))}
                  </div>
                  <ul className="list-unstyled ms-1 text-truncate">
                    <li>
                      <span className="ms-1 fs-sm text-nowrap">
                        <h3 className="ms-2">
                          {" "}
                          <b>
                            {object["firstName"]} {object["middleName"]}{" "}
                            {object["lastName"]}
                          </b>
                        </h3>
                      </span>
                    </li>
                    {/* <li>
                      <span className="ms-2 fs-sm text-nowrap">
                        {this.calculateAge(object["birthDate"])} years old,{" "}
                        {object["gender"] &&
                          object["gender"].charAt(0).toUpperCase() +
                            object["gender"].slice(1)}
                      </span>
                    </li> */}
                    <li>
                      <span className="ms-2 fs-sm text-nowrap">
                        {object["birthDate"]
                          ? `${this.calculateAge(
                              object["birthDate"]
                            )} years old, `
                          : ""}
                        {object["gender"] &&
                          `${
                            object["gender"].charAt(0).toUpperCase() +
                            object["gender"].slice(1)
                          }`}
                      </span>
                    </li>

                    <li>
                      <span className="ms-2 fs-sm text-nowrap">
                        {object["address"]}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}

            <Table
              fields={schema.fields}
              objects={consult}
              className="mt-3"
              //   onCollapse={this.onCollapse.bind(this)}
              //   onClickItem={this.onClickItem.bind(this)}

              excludeFields={Object.keys(schema.fields).filter(
                (key) =>
                  key !== "consultationName" &&
                  key !== "diagnosis" &&
                  key !== "createdAt"
              )}
            />
          </div>
        </div>
        <div className="position-fixed text-end bottom-0 end-0 m-4">
          <Button
            className="shadow-sm bg-primary btn btn-primary m-2"
            onClick={this.onClickAdd.bind(this, objects)}
          >
            ADD CONSULTATION
          </Button>
          <Button
            className="shadow-sm bg-primary btn btn-primary m-2"
            onClick={this.onClickBack.bind(this)}
          >
            GO BACK
          </Button>
        </div>
      </>
    );
  }
}

export default withRouter(ConsultationPage);
