import React from "react";
import BaseFormPage from "../../../base/BaseFormPage";
import ContractPresenter from "./ContractPresenter";
import { getObjectUseCase, upsertUseCase } from "../../../usecases/object";
import withRouter from "../../../withRouter";
import NavBar2 from "../../../components/navbar2";
import { FormFactory } from "nq-component";

class ContractPage extends BaseFormPage {
  constructor(props) {
    super(props);
    this.presenter = new ContractPresenter(
      this,
      getObjectUseCase(),
      upsertUseCase()
    );
    this.state = {
      object: {},
    };
  }

  getCollectionName() {
    return "contractDetails";
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.presenter.submit();
  }

  render() {
    const schema = this.getSchema("contractDetails");
    const object = this.state.object;
    return (
      <>
        <NavBar2 />
        <div className="container p-3 px-lg-5 py-lg-4 overflow-auto">
          <nav>
            <div className="nav nav-tabs"></div>
          </nav>
          <div className="mt-3 bg-white shadow rounded p-3 px-lg-5 py-lg-4">
            <form onSubmit={this.onSubmitForm.bind(this)}>
              <div className="row g-3 mb-3">
                <div className="px-2">
                  <p className="small fw-bold mb-2">Contract Details</p>
                  <hr className="dropdown-divider" />
                </div>
                <FormFactory
                  className="col-md-4"
                  schema={schema}
                  object={object}
                  onChange={this.onChange.bind(this)}
                  excludeFields={["createdAt", "updatedAt", "id"]}
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

export default withRouter(ContractPage);
