import React from "react";
import withRouter from "../../../withRouter";
import BaseListPage from "../../../base/BaseListPage";
import NavBar from "../../../components/navbar";
import BasePage from "../../../base/BasePage";
import { Table, InfiniteScroll, Button, InputFactory } from "nq-component";
import AppoinmentPresenter from "./AppointmentPresenter";
import { findObjectUseCase } from "../../../usecases/object";

class AppointmentPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new AppoinmentPresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
      selected: [],
      progress: true,
      total: 0,
      count: 0,
    };
  }

  getCollectionName() {
    return "appointment";
  }

  render() {
    const schema = this.getSchema(this.getCollectionName());
    // console.log(schema, "SCHEMA");
    const collection = this.getCollectionName();
    // console.log(collection, "COLLECTION");
    const user = this.getCurrentUser();
    // console.log(user, "the user");
    const { objects, selected, progress, count } = this.state;

    // console.log(objects, "the objects");
    return (
      <>
        <NavBar />
        <div className="m-5">
          <h4>My Appointments</h4>
        </div>
        <div></div>
        <div className="overflow-auto">
          <InfiniteScroll
            className="h-100"
            loadMore={this.loadMore.bind(this)}
            hasMore={!progress && count > objects.length}
          >
            <div className="p-3 p-lg-4">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="fw-bold text-capitalize">
                  {schema.label || this.getCollectionName()}
                </h1>
                {selected.length > 0 ? (
                  <div>
                    <span className="ms-2">Selected: </span>
                    <span className="fs-sm text-nowrap">{selected.length}</span>
                    <span className="ms-1">of </span>
                    <span className="fs-sm text-nowrap">{count}</span>
                  </div>
                ) : (
                  <div>
                    <span className="ms-2">Total: </span>
                    <span className="fs-sm text-nowrap">{objects.length}</span>
                    <span className="ms-1">of </span>
                    <span className="fs-sm text-nowrap">{count}</span>
                  </div>
                )}
              </div>
              <div className="d-flex mt-3">
                {Object.keys(schema.filters || {}).map((field) => {
                  let { type, ...options } = schema.filters[field];
                  return (
                    <InputFactory
                      key={field}
                      className="ms-1"
                      type={type}
                      field={field}
                      where={{}}
                      onChange={this.onChangeFilter.bind(this, type)}
                      {...options}
                    />
                  );
                })}
              </div>
              {/* <Search
                schemas={this.getSchemas()}
                className="mt-3"
                onSubmit={this.searchSubmit.bind(this)}
                fields={schema.fields}
              /> */}
              <Table
                fields={schema.fields}
                objects={objects}
                selectable
                collapsable
                excludeFields={Object.keys(schema.fields).reduce(
                  (acc, key) => {
                    const options = schema.fields[key];
                    if (options.read === false) {
                      acc.push(key);
                    }
                    switch (options._type || options.type) {
                      case "Relation":
                      case "Array":
                      case "Object":
                      case "File":
                        acc.push(key);
                        break;
                      default:
                    }
                    return acc;
                  },
                  ["acl", "password"]
                )}
                selected={selected}
                onSelect={this.onSelect.bind(this)}
                onSelectAll={this.onSelectAll.bind(this)}
                progress={progress}
                onClickItem={this.onClickItem.bind(this)}
                className="mt-3"
              />
            </div>
          </InfiniteScroll>
        </div>
        {/* <div className="position-fixed bottom-0 end-0 m-4">
          <Button
            className="btn btn-primary shadow-sm bg-primary"
            onClick={this.onClickAdd.bind(this)}
            style={{ width: "50px", height: "50px", borderRadius: "25px" }}
          >
            <i className="bi bi-plus-lg" />
          </Button>
        </div> */}
        {/* <div>
          
          <Table
            collapsable
            objects={objects}
            fields={schema.fields}
            excludeFields={Object.keys(schema.fields).reduce(
              (acc, key) => {
                const options = schema.fields[key];
                if (options.read === false) {
                  acc.push(key);
                }
                switch (options._type || options.type) {
                  case "Relation":
                  case "Array":
                  case "Object":
                  case "File":
                    acc.push(key);
                    break;
                  default:
                }
                return acc;
              },
              ["acl", "password"]
            )}
          />
        </div> */}
      </>
    );
  }
}

export default withRouter(AppointmentPage);
