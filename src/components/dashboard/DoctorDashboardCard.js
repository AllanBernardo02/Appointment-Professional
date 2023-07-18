import React from "react";
import classNames from "../../classNames";

const defaultProps = {
  className: "bg-white",
  icon: "bi bi-people",
  value: "",
  label: "TOTAL SENIORS",
};

function DoctorDashboardCard({ className, icon, label, value, onClick }) {
  return (
    <div>
      <div
        className={classNames("p-3 p-lg-4 shadow-sm", className)}
        style={{ backgroundColor: "rgba(0, 86, 86, 1)" }}
      >
        <div className="d-flex justify-content-between">
          <span className="fs-1">
            <i className={icon}></i>
          </span>
          <h1>{value}</h1>
        </div>
        <div className="text-end">
          <p className="m-0 text-truncate text-uppercase">{label}</p>
        </div>
      </div>
      <div>
        <button
          onClick={onClick}
          className="container-fluid "
          style={{ backgroundColor: "white" }}
        >
          View
        </button>
      </div>
    </div>
  );
}

DoctorDashboardCard.defaultProps = defaultProps;
export default DoctorDashboardCard;
