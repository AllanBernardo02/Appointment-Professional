import React from "react";
import { Link } from "react-router-dom";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="d-flex align-items-center">
        <div className="container text-center">
          {/* <img
            className="img-fluid login-img"
            width="400"
            src="/assets/images/under-construction.svg"
            alt="banner"
          /> */}
          <h2 className="mt-3 fw-bold">No recent chats found.</h2>
        </div>
        <div>
          <button>
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
