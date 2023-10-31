import React from "react";
import withRouter from "../../../withRouter";
import BaseFormPage from "../../../base/BaseFormPage";
import NavBar from "../../../components/navbar";
import InputFactory from "../../../components/InputFactory";
import MedicalFormPresenter from "./MedicalFormPresenter";
import FormFactory from "../../../components/FormFactory";
import {
  deleteObjectUseCase,
  findObjectUseCase,
  getObjectUseCase,
  upsertUseCase,
} from "../../../usecases/object";
import {
  addSchemaUseCase,
  deleteSchemaUseCase,
  updateSchemaUseCase,
} from "../../../usecases/schema/usecases";
import { exportCSVUseCase } from "../../../usecases/csv/usecases";
import fields from "./fields.json";
import camelToTitleCase from "nq-component/dist/camelToTitleCase";
import BasePage from "../../../base/BasePage";

const tabs = [
  {
    label: "Patient Information",
    fields: fields,
    required: true,
  },
];

class MedicalFormPage extends BaseFormPage {
  constructor(props) {
    super(props);
    this.presenter = new MedicalFormPresenter(
      this,
      // findObjectUseCase(),
      getObjectUseCase(),
      upsertUseCase()
      // updateSchemaUseCase()
    );
    this.state = {
      object: {},
      page: 0,
    };
  }

  getCollectionName() {
    return "patient";
  }

  render() {
    const schema = this.getSchema("patient");
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
                  <p className="small fw-bold mb-0">Patient Details</p>
                  <hr className="dropdown-divider" />
                </div>

                <FormFactory
                  schema={schema}
                  object={object}
                  onChange={this.onChange.bind(this)}
                  excludeFields={["createdAt", "updatedAt"]}
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

export default withRouter(MedicalFormPage);
