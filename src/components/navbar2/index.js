import React from "react";
import { NavBar as Nav, Layout, LogoHolder } from "nq-component";
import classNames from "../../classNames";
import { useNavigate } from "react-router-dom";

function NavBar2({ user }) {
  const classes = classNames("navbar navbar-expand-lg navbar-light bg-white");
  const { collapsed, setCollapse } = React.useContext(Layout.Context);
  const location = useNavigate();

  function onClickNavigate() {
    setCollapse(!collapsed);
  }

  React.useEffect(() => {
    setCollapse(false);
  }, [setCollapse]);

  const navigateProfile = () => {
    location("/account");
  };

  const backHome = () => {
    location("/");
  };

  return (
    <nav className={classes}>
      <div className="container-fluid">
        <button
          onClick={onClickNavigate}
          type="button"
          className="btn btn-sm btn-link fs-4 ps-0 text-dark"
        >
          <i className="bi bi-justify-left"></i>
        </button>
        <a href="# " className="navbar-brand me-auto"></a>

        <div onClick={backHome} className="d-flex">
          <img
            className="w-auto me-2"
            height="38"
            src={"/logo.svg"}
            alt="logo"
          />

          <h6 className="mt-2 fw-bold">APPTIMIZER</h6>
        </div>

        <a href="# " className="navbar-brand me-auto"></a>

        <button
          type="button"
          className="btn btn-sm btn-link fs-4 ps-0 text-dark"
        >
          <i className="bi bi-bell"></i>
        </button>
      </div>
    </nav>
  );
}

export default NavBar2;
