import { Button, InfiniteScroll, Table } from "nq-component";
import React, { Component } from "react";
import BasePage from "../../../base/BasePage";
import NavBar from "../../../components/navbar";
import Search from "../../../components/Search";
import withRouter from "../../../withRouter";
import fields from "./fields.json";
import medicalfields from "./medicalfields.json";
import BaseListPage from "../../../base/BaseListPage";
import dateFormat from "../../../dateFormat";
import {
  deleteObjectUseCase,
  findObjectUseCase,
  upsertUseCase,
} from "../../../usecases/object";
import { exportCSVUseCase } from "../../../usecases/csv/usecases";
import {
  addSchemaUseCase,
  deleteSchemaUseCase,
  updateSchemaUseCase,
} from "../../../usecases/schema/usecases";
import MedicalRecordPresenter from "./MedicalRecordPresenter";

class MedicalRecordPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new MedicalRecordPresenter(
      this,
      findObjectUseCase(),
      // deleteObjectUseCase(),
      upsertUseCase(),
      exportCSVUseCase(),
      addSchemaUseCase(),
      updateSchemaUseCase(),
      deleteSchemaUseCase()
    );
    this.state = {
      objects: [],
    };
  }

  getCollectionName() {
    return "patient";
  }

  onClickItem(index, field) {
    console.log("Index", field);
    this.presenter.onClickItem(index);
  }

  onClickHistory(index, field) {
    const object = this.state.objects[index];
    console.log("history", index);

    this.navigateTo("/consulationHistory/" + index.id);
  }

  onCollapse(object, index) {
    console.log("obs", index);
    return (
      <div>
        <div className="d-flex">
          <div>
            {index["profile"] && (
              <img
                style={{ width: "100px", height: "100px" }}
                src={index["profile"]}
                alt=""
              />
            )}
            {!index["profile"] && <i className="bi bi-person-circle fs-1"></i>}
          </div>
          <ul className="list-unstyled ms-1 text-truncate">
            <li>
              <span className="ms-2 fw-light fw-bold">Name: </span>
              <span className="fs-sm text-nowrap">
                {index["firstName"]} {object["middleName"]} {object["lastName"]}
              </span>
            </li>
            <li>
              <span className="ms-2 fw-light fw-bold">Suffix: </span>
              <span className="fs-sm text-nowrap">{object["suffix"]}</span>
            </li>
            <li>
              <span className="ms-2 fw-light fw-bold">Gender: </span>
              <span className="fs-sm text-nowrap">{object["gender"]}</span>
            </li>
            <li>
              <span className="ms-2 fw-light fw-bold">Mobile: </span>
              <span className="fs-sm text-nowrap">{object["mobile"]}</span>
            </li>
            <li>
              <span className="ms-2 fw-light fw-bold">Birth Date: </span>
              <span className="fs-sm text-nowrap">
                {dateFormat(object["birthDate"])}
              </span>
            </li>
            <li>
              <span className="ms-2 fw-light fw-bold">Address: </span>
              <span className="fs-sm text-nowrap">{object["address"]}</span>
            </li>
            <li>
              <span className="ms-2 fw-light fw-bold">email: </span>
              <span className="fs-sm text-nowrap">{object["email"]}</span>
            </li>
            <li>
              <span className="ms-2 fw-light fw-bold">Occupation: </span>
              <span className="fs-sm text-nowrap">{object["occupation"]}</span>
            </li>
          </ul>
        </div>
        <button
          onClick={this.onClickItem.bind(this, index)}
          className="btn btn-primary btn-sm"
        >
          EDIT
        </button>

        <button
          onClick={this.onClickHistory.bind(this, index)}
          className="btn btn-secondary btn-sm ms-3"
          style={{ backgroundColor: "rgba(0, 86, 86, 1)", color: "white" }}
        >
          CONSULTATION HISTORY
        </button>
        <button
          // onClick={this.onClickPrint.bind(this, index)}
          className="btn btn-secondary btn-sm ms-3"
          style={{ backgroundColor: "red", color: "white" }}
        >
          PRINT CERTIFICATE
        </button>
      </div>
    );
  }

  render() {
    const { objects } = this.state;
    const schema = this.getSchema("patient");
    console.log("objects:", schema);
    return (
      <>
        <NavBar className="shadow-sm" />

        <div className="overflow-auto">
          <div className="p-3 p-lg-4">
            <h1 className="fw-bold mt-3 text-capitalize">Customer List</h1>
            <Search
              className="mt-3"
              onSubmit={this.searchSubmit.bind(this)}
              fields={schema.fields}
            />
            <Table
              fields={schema.fields}
              // fields={medicalfields}
              objects={objects}
              className="mt-3"
              onCollapse={this.onCollapse.bind(this)}
              onClickItem={this.onClickItem.bind(this)}
              // excludeFields={Object.keys(schema.fields).reduce(
              //   (acc, key) => {
              //     const options = schema.fields[key];
              //     if (options.read === false) {
              //       acc.push(key);
              //     }
              //     switch (options._type || options.type) {
              //       case "Relation":
              //       case "Array":
              //       case "Object":
              //       case "File":
              //         acc.push(key);
              //         break;
              //       default:
              //     }
              //     return acc;
              //   },
              //   ["acl", "password"]
              // )}
              excludeFields={Object.keys(schema.fields).filter(
                (key) =>
                  key !== "firstName" &&
                  key !== "middleName" &&
                  key !== "lastName"
              )}
            />
          </div>
        </div>

        <div className="position-fixed bottom-0 end-0 m-4">
          <Button
            className="shadow-sm bg-primary"
            onClick={this.onClickAdd.bind(this)}
            style={{ width: "50px", height: "50px", borderRadius: "25px" }}
          >
            <i className="bi bi-plus-lg" />
          </Button>
        </div>
      </>
    );
  }
}

export default withRouter(MedicalRecordPage);
