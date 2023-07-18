import React, { Component } from "react";
import BaseFormPage from "../../../base/BaseFormPage";
import BasePage from "../../../base/BasePage";
import DoctorDashboardCard from "../../../components/dashboard/DoctorDashboardCard";
import NavBar from "../../../components/navbar";
import withRouter from "../../../withRouter";

class DashboardDoctorPage extends BasePage {
  render() {
    return (
      <>
        <NavBar className="shadow-sm" />
        <div className="container p-3 px-lg-5 py-lg-4 overflow-auto">
          <h2 className="text-capitalize mt-3">Dashboard</h2>
          {/* <div className="d-flex">
            <div className="input-group w-auto">
              <i className="input-group-text bi bi-diagram-3"></i>
              <InputFactory
                label="All Barangay"
                field="Barangay"
                object={{}}
                type="Pointer"
                target="barangays"
                onChange={this.onChangeBarangay.bind(this)}
              />
            </div>
          </div> */}
          <div className="row mt-3 g-3">
            <div className="col-6 col-md-3">
              <DoctorDashboardCard
                className="text-white"
                icon="bi bi-calendar-heart"
                label="DONE APPOINTMENT"
                value="10"
                // value={totalPwd?.length}
                // onClick={() =>
                //   this.renderDialog(totalPwd, "Total PWD", this.pwdRef)
                // }
              />
            </div>
            <div className="col-6 col-md-3">
              <DoctorDashboardCard
                className="text-white"
                icon="bi bi-calendar-range"
                label="PENDING APPOINTMENT"
                value="15"
                // value={learning?.length}
                // onClick={() =>
                //   this.renderDialog(
                //     learning,
                //     "Total Learning Disabilities",
                //     this.learningRef
                //   )
                // }
              />
            </div>
            <div className="col-6 col-md-3">
              <DoctorDashboardCard
                className="text-white"
                icon="bi bi-calendar-check"
                label="APPROVED APPOINTMENT"
                value="20"
                // value={psychological?.length}
                // onClick={() =>
                //   this.renderDialog(
                //     psychological,
                //     "Total Psychological Disabilities",
                //     this.psychologicalRef
                //   )
                // }
              />
            </div>
            <div className="col-6 col-md-3">
              <DoctorDashboardCard
                className="text-white"
                icon="bi bi-calendar-x"
                label="CANCELLED APPOINTMENT"
                value="5"
                // value={visual?.length}
                // onClick={() =>
                //   this.renderDialog(
                //     visual,
                //     "Total Visual Disabilities",
                //     this.visualRef
                //   )
                // }
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(DashboardDoctorPage);
