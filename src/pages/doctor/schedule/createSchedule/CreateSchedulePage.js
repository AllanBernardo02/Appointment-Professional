import React, { Component } from "react";
import BaseListPage from "../../../../base/BaseListPage";
import BasePage from "../../../../base/BasePage";
import CreateSchedulePresenter from "./CreateSchedulePresenter";
import NavBar from "../../../../components/navbar";
import Search from "../../../../components/Search";
import FormFactory from "../../../../components/FormFactory";
import BaseFormPage from "../../../../base/BaseFormPage";
import { Checkbox } from "nq-component";
import { getObjectUseCase, upsertUseCase } from "../../../../usecases/object";

class CreateSchedulePage extends BaseFormPage {
  constructor(props) {
    super(props);
    this.presenter = new CreateSchedulePresenter(
      this,
      getObjectUseCase(),
      upsertUseCase()
    );
    this.state = {
      object: {},
    };
  }

  getCollectionName() {
    return "schedules";
  }
  render() {
    const schema = this.getSchema(this.getCollectionName());
    const object = this.state.object;
    return (
      <>
        <NavBar />
        <div className="overflow-auto">
          <div className="p-3 p-lg-4">
            <h2 className="fw-bold mt-3 text-capitalize">My Schedule</h2>
          </div>

          <div className="container p-3 px-lg-5 py-lg-4 overflow-auto">
            <nav>
              <div className="nav nav-tabs"></div>
            </nav>
            <div className="mt-3 bg-white shadow rounded p-3 px-lg-5 py-lg-4">
              <form onSubmit={this.onSubmitForm.bind(this)}>
                <div className="row g-3 mb-3">
                  <div className="px-2">
                    <hr className="dropdown-divider" />
                    <h5>Set Date</h5>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateSchedulePage;
