import React from "react";
import MainPagePresenter from "./MainPagePresenter";
import Queue from "nq";
import { Menu } from "nq-component";
import { getAllSchemasUseCase } from "../../usecases/schema/usecases";
import { getCurrentUserUseCase, signOutUseCase } from "../../usecases/user";
import { Routes, Route } from "react-router-dom";
import { OffCanvas } from "nq-component";
import TablePage from "../collection-list/CollectionListPage";
import FormPage from "../collection-form/CollectionFormPage";
import BasePage from "../../base/BasePage";
import NotFoundPage from "../notfound";
import { Layout, Progress } from "nq-component";
import getProfile from "../../getProfile";
import MigrationPage from "../migration/MigrationPage";
import AccountPage from "../account/AccountPage";
import RolePage from "../role/RolePage";
import canRead from "../../canRead";
import withRouter from "../../withRouter";
import DashboardDoctorPage from "../doctor/dashboard/DashboardDoctorPage";
import MedicalRecordPage from "../doctor/medicalRecord/MedicalRecordPage";
import MedicalFormPage from "../doctor/medicalRecord/MedicalFormPage";
import CreateSchedulePage from "../doctor/schedule/createSchedule/CreateSchedulePage";
import AppointmentPage from "../doctor/appointment/AppointmentPage";
import Calendar from "../../components/calendar/Calendar";
import Tutorial from "../Tutorial";
import ConsultationPage from "../doctor/medicalRecord/consultationHistory/ConsultationPage";
import ConsultationFormPage from "../doctor/medicalRecord/consultationHistory/ConsultationFormPage";
import ViewPage from "../doctor/schedule/viewSchedule/ViewPage";
import ChatPage from "../chat/ChatPage";
import ChatUserPage from "../chat-user/ChatUserPage";
import ChatMessagePage from "../chat-message/ChatMessagePage";
import HomePage from "../home/HomePage";
import Photo from "../../assets/img/profile_icon.jpg";
import NewConsultation from "../doctor/medicalRecord/consultationHistory/NewConsultation";
import ContractPage from "../TEST/contract/ContractPage";
import ViewContract from "../TEST/view/ViewContract";
import ContractTemplate from "../TEST/template/ContractTemplate";

const scheduleMenus = [
  {
    name: "Create Schedule",
    icon: "bi bi-calendar-check",
    route: "/create-schedule",
  },
  {
    name: "View Schedule",
    icon: "bi bi-calendar3",
    route: "/view-schedules",
  },
];

const contractMenu = [
  {
    name: "Create Contract",
    icon: "bi bi-card-text",
    route: "/create-contract",
  },
  {
    name: "View Contract",
    icon: "bi bi-calendar3",
    route: "/view-contracts",
  },
];

const menus = [
  {
    name: "Home",
    icon: "bi bi-layout-text-window-reverse",
    route: "/",
    access: ["PROFESSIONAL"],
  },
  {
    name: "Dashboard",
    icon: "bi bi-layout-text-window-reverse",
    route: "/dashboard",
    access: ["PROFESSIONAL"],
  },
  {
    name: "Chat",
    icon: "bi bi-chat-dots",
    route: "/chat",
    access: ["ADMIN"],
  },
  {
    name: "Medical Record",
    icon: "bi bi-clipboard2-pulse",
    route: "/medical-record",
    access: ["ADMIN"],
  },
  {
    name: "Schedule",
    icon: "bi bi-calendar",
    route: scheduleMenus,
    access: ["ADMIN"],
  },
  {
    name: "My Appointments",
    icon: "bi bi-card-checklist",
    route: "/appointment",
    access: ["ADMIN"],
  },
  {
    name: "Contracts",
    icon: "bi bi-briefcase",
    route: contractMenu,
  },
  {
    name: "Settings",
    icon: "bi bi-gear",
    route: "/account",
    access: ["ADMIN"],
  },
  // {
  //   name: "Sample",
  //   icon: "bi bi-gear",
  //   route: "/tutorial",
  //   access: ["ADMIN"],
  // },
];

class MainPage extends BasePage {
  constructor(props) {
    super(props);
    this.presenter = new MainPagePresenter(
      this,
      getCurrentUserUseCase(),
      signOutUseCase(),
      getAllSchemasUseCase()
    );
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  onClickSignOut() {
    this.presenter.onClickSignOut();
  }

  onClickMenu(e, item) {
    e.preventDefault();
    this.navigateTo(item.route);
  }

  render() {
    const user = this.getCurrentUser();
    console.log(user);
    const schemas = this.getSchemas();
    const roles = this.getCurrentRoles();
    if (user === undefined || schemas === undefined) {
      return <Progress />;
    }
    return (
      <Layout>
        <Layout.Context.Consumer>
          {(value) => (
            <OffCanvas onSetShow={value.setCollapse} show={value.collapsed}>
              <div className="offcanvas-body">
                <nav className="navbar-dark">
                  <div className="text-center">
                    <img
                      className="img-fluid rounded-circle img-thumbnail p-0 m-2"
                      src={
                        (user.profile && Queue.File.getFile(user.profile)) ||
                        Photo
                      }
                      width="80"
                      height="80"
                      alt="P"
                    />
                    <p className="text-white">{user.name || user.username}</p>
                  </div>
                  <hr className="dropdown-divider bg-light" />
                  <Menu
                    onClickItem={this.onClickMenu.bind(this)}
                    menus={menus}
                  />
                </nav>
              </div>
              <div className="m-3">
                <button
                  className="nav-link text-white btn btn-link"
                  onClick={this.onClickSignOut.bind(this)}
                >
                  <i className="bi bi-power"></i>
                  <span className="ms-2 fw-bold small">Log out</span>
                </button>
              </div>
            </OffCanvas>
          )}
        </Layout.Context.Consumer>
        <main className="vh-100 d-flex flex-column">
          <Routes>
            <Route exact path={"/collection/:name"} element={<TablePage />} />
            <Route path={"/collection/:name/form/"} element={<FormPage />} />
            <Route path={"/collection/roles/form"} element={<RolePage />} />
            <Route path={"/collection/roles/form/:id"} element={<RolePage />} />
            <Route path={"/collection/:name/form/:id"} element={<FormPage />} />
            <Route path={"/migration"} element={<MigrationPage />} />
            <Route path={"/account"} element={<AccountPage />} />
            <Route element={<NotFoundPage />} />
            <Route path={"/dashboard"} element={<DashboardDoctorPage />} />
            <Route path={"/medical-record"} element={<MedicalRecordPage />} />
            <Route path={"/medical-form"} element={<MedicalFormPage />} />
            {/* Schedule Route */}
            <Route path={"/create-schedule"} element={<CreateSchedulePage />} />
            <Route path={"/appointment"} element={<AppointmentPage />} />
            <Route path={"/try"} element={<Calendar />} />
            <Route path={"/tutorial"} element={<Tutorial />} />
            <Route
              path={"/consulationHistory/:id"}
              element={<ConsultationPage />}
            />
            <Route
              // path={"/consultation-form/:name/form/:id"}
              path={"/consultation-form/:id/:id"}
              element={<ConsultationFormPage />}
            />
            <Route
              path={"/add-consultation/:id"}
              element={<NewConsultation />}
            />
            <Route path={"/create-contract"} element={<ContractPage />} />
            <Route path={"/view-contracts"} element={<ViewContract />} />
            <Route path={"/contract/:id"} element={<ContractTemplate />} />
            <Route path={"/add-consultation/"} element={<NewConsultation />} />
            <Route path={"/view-schedules"} element={<ViewPage />} />
            <Route exact path={"/chat"} element={<ChatPage />} />
            <Route exact path={"/chat/user"} element={<ChatUserPage />} />
            <Route exact path={"/message"} element={<ChatMessagePage />} />
            <Route path={"/"} element={<HomePage />} />
          </Routes>
        </main>
      </Layout>
    );
  }
}

export default withRouter(MainPage);
