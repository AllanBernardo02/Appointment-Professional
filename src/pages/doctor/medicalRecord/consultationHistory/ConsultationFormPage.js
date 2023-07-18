import React, { Component } from "react";
import withRouter from "../../../../withRouter";
import BasePage from "../../../../base/BasePage";
import ConsultationFormPresenter from "./ConsultationFormPresenter";
import { getObjectUseCase, upsertUseCase } from "../../../../usecases/object";
import FormFactory from "../../../../components/FormFactory";
import NavBar from "../../../../components/navbar";

class ConsultationFormPage extends BasePage {
  constructor(props) {
    super(props);
    this.presenter = new ConsultationFormPresenter(
      this,
      getObjectUseCase(),
      upsertUseCase()
    );
    this.state = {
      object: {},
      page: 0,
    };
  }

  //   getObjectId() {
  //     return this.props.params.id;
  //   }

  getObject() {
    return this.state.object;
  }

  getAcl() {
    const roles = this.getCurrentRoles();

    const aclRoles = roles.map((r) => `role:${r.name}`);
    const user = this.getCurrentUser();
    return {
      read: ["*", user.id, ...aclRoles],
      write: [user.id, ...aclRoles],
    };
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  getCollectionName() {
    return "patientConsultation";
  }

  onChange(field, data) {
    this.presenter.onChange(field, data);
  }

  onClickBack() {
    this.presenter.onClickBack();
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.presenter.submit();
  }
  render() {
    const schema = this.getSchema("patientConsultation");
    const object = this.state.object;
    return (
      <>
        <NavBar />
        <div className="container p-3 px-lg-5 py-lg-4 overflow-auto">
          <nav>
            <div className="nav nav-tabs"></div>
          </nav>
          <div className="mt-3 bg-white shadow rounded p-3 px-lg-5 py-lg-4">
            <form onSubmit={this.onSubmitForm.bind(this)}>
              <div className="row g-3 mb-3">
                <div className="px-2">
                  <p className="small fw-bold mb-0 ms-1">Patient Details</p>
                  <hr className="dropdown-divider" />
                </div>

                <FormFactory
                  schema={schema}
                  object={object}
                  onChange={this.onChange.bind(this)}
                />
              </div>

              <div className="mt-3">
                <button type="submit" className="btn btn-primary fs-sm me-3">
                  <i className="bi bi-file-earmark-check me-2"></i>SAVE
                </button>
                <button
                  type="button"
                  className="btn btn-light fs-sm"
                  onClick={this.onClickBack.bind(this)}
                >
                  GO BACK
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ConsultationFormPage);
