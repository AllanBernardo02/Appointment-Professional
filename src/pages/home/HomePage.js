import React, { Component } from "react";
import Queue from "nq";
import BasePage from "../../base/BasePage";
import withRouter from "../../withRouter";
import NavBar2 from "../../components/navbar2";
import getProfile from "../../getProfile";
import Photo from "../../assets/img/profile_icon.jpg";
import { Link } from "react-router-dom";

const textstyle = {
  color: "rgba(0, 86, 86, 1)",
  fontFamily: "Poppins, sans-serif",
  fontSize: "12px",
};

const backgroundstyle = {
  backgroundColor: "#3A57A708",
  width: "70px",
  height: "70px",
  borderRadius: "20%",
  boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.15)",
};

class HomePage extends BasePage {
  constructor(props) {
    super(props);
  }

  navigateToRoute = (route) => {
    switch (route) {
      case "medical-record":
        this.navigateTo("/medical-record");
        break;
      case "account":
        this.navigateTo("/account");
        break;
      default:
        break;
    }
  };

  render() {
    const user = this.getCurrentUser();
    console.log(user);
    const profile = getProfile(user);
    return (
      <>
        <NavBar2 user={user} />

        <div className="">
          <div
            className="d-flex justify-content-between text-white m-3 rounded"
            style={{
              backgroundColor: "rgba(0, 86, 86, 1)",
              // borderRadius: "50px 50px",
            }}
          >
            <div className=" d-flex mt-3 ms-3 mb-3">
              <img
                alt="profile"
                className="img-fluid rounded-circle img-thumbnail me-2"
                src={
                  (user.profile && Queue.File.getFile(user.profile)) || Photo
                }
                width="70"
                height="70"
              />

              <div className="mt-2 ">
                <p className="fw-bold mb-1">Welcome</p>
                <p className="fw-bold mb-1">Dr. {user.firstName}</p>
                {/* <p className="mb-0">{greeting}</p> */}
              </div>
            </div>

            <div className="mt-4 ms-2">
              {/* <p className="fw-bold mb-1">Welcome</p>
                <p className="fw-bold mb-1">{user.firstName}</p> */}
              {/* <p className="mb-0">{greeting}</p> */}
            </div>
            <div
              className="mt-4"
              onClick={() => this.navigateToRoute("account")}
            >
              {/* <button
                  // onClick={onClickNavigate}
                  type="button"
                  className="btn btn-sm btn-link fs-4 ps-0 text-dark"
                >
                  <i className="bi bi-sliders text-white"></i>
                </button>
                <p className="mb-0">Account</p> */}
              <img
                className="w-auto me-2"
                height="38"
                src={"/Frame 11.svg"}
                alt="logo"
              />
            </div>
          </div>
          <div className="m-2">
            <img
              className="w-auto"
              height="117"
              weight="100"
              src={"/Rectangle 6.svg"}
              alt="logo"
            />
          </div>
          <div
            className=" bg-white pt-3"
            style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <div className="row text-center">
              <div
                className="col d-flex flex-column align-items-center"
                onClick={() => this.navigateToRoute("medical-record")}
              >
                <div
                  style={backgroundstyle}
                  className="d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-link fs-5  text-dark"
                  >
                    <i
                      className="bi bi-file-medical"
                      style={{ color: "rgba(0, 86, 86, 1)" }}
                    ></i>
                  </button>
                </div>
                <p style={textstyle}>Health Records</p>
              </div>
              <div className="col d-flex flex-column align-items-center">
                <div
                  style={backgroundstyle}
                  className="d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-link fs-5  text-dark"
                  >
                    <i
                      className="bi bi-journal-plus"
                      style={{ color: "rgba(0, 86, 86, 1)" }}
                    ></i>
                  </button>
                </div>
                <p style={textstyle}>Medical Planner</p>
              </div>
              <div className="col d-flex flex-column align-items-center">
                <div
                  style={backgroundstyle}
                  className="d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-link fs-5  text-dark"
                  >
                    <i
                      className=" bi bi-calendar-check"
                      style={{ color: "rgba(0, 86, 86, 1)" }}
                    ></i>
                  </button>
                </div>
                <p style={textstyle}>Appointment Scheduler</p>
              </div>
              <div className="col d-flex flex-column align-items-center">
                <div
                  style={backgroundstyle}
                  className="d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-link fs-5  text-dark"
                  >
                    <Link to="/view-schedules/">
                      <i
                        className=" bi bi-calendar-week"
                        style={{ color: "rgba(0, 86, 86, 1)" }}
                      ></i>
                    </Link>
                  </button>
                </div>
                <p style={textstyle}>Calendar View</p>
              </div>
            </div>
            <div className="row text-center">
              <div className="col d-flex flex-column align-items-center">
                <div
                  style={backgroundstyle}
                  className="d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-link fs-5  text-dark"
                  >
                    <i
                      className="bi bi-clipboard-pulse"
                      style={{ color: "rgba(0, 86, 86, 1)" }}
                    ></i>
                  </button>
                </div>
                <p className="mb-0" style={textstyle}>
                  Appointment
                </p>
                <p style={textstyle}>Hub</p>
              </div>

              <div className="col d-flex flex-column align-items-center">
                <div
                  style={backgroundstyle}
                  className="d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-link fs-5  text-dark"
                  >
                    <i
                      className="bi bi-megaphone"
                      style={{ color: "rgba(0, 86, 86, 1)" }}
                    ></i>
                  </button>
                </div>
                <p className="mb-0" style={textstyle}>
                  Announce
                </p>
                <p style={textstyle}>ment</p>
              </div>
              <div className="col d-flex flex-column align-items-center">
                <div
                  style={backgroundstyle}
                  className="d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-link fs-5  text-dark"
                  >
                    <i
                      className="bi bi-person-bounding-box"
                      style={{ color: "rgba(0, 86, 86, 1)" }}
                    ></i>
                  </button>
                </div>
                <p style={textstyle}>Profile</p>
              </div>
              <div className="col d-flex flex-column align-items-center">
                <div
                  style={backgroundstyle}
                  className="d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-link fs-5  text-dark"
                  >
                    <i
                      className="bi bi-person-video2"
                      style={{ color: "rgba(0, 86, 86, 1)" }}
                    ></i>
                  </button>
                </div>
                <p style={textstyle}>Certificate</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(HomePage);
