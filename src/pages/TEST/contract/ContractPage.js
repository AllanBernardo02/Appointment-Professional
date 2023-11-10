import React from "react";
import ContractPresenter from "./ContractPresenter";
import { findObjectUseCase, upsertUseCase } from "../../../usecases/object";
import withRouter from "../../../withRouter";
import NavBar2 from "../../../components/navbar2";
import { Button, InfiniteScroll, Table } from "nq-component";
import BaseListPage from "../../../base/BaseListPage";
import { exportCSVUseCase } from "../../../usecases/csv/usecases";
import {
  addSchemaUseCase,
  deleteSchemaUseCase,
  updateSchemaUseCase,
} from "../../../usecases/schema/usecases";
import Template from "../components/file";
import printComponent from "../../../printComponent";

class ContractPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new ContractPresenter(
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
      progress: true,
      selected: [],
      total: 0,
      count: 0,
    };
    this.contractPDF = React.createRef();
  }

  getCollectionName() {
    return "contractDetails";
  }

  onClickExport() {
    this.presenter.onClickExport();
  }

  exportPDF() {
    printComponent(this.contractPDF.current, "Contracts");
  }

  render() {
    const schema = this.getSchema("contractDetails");
    console.log("schema", schema);
    const objects = this.state.objects;
    const selected = this.state.selected;
    console.log("selected", selected);
    const progress = this.state.progress;
    const count = this.state.count;
    console.log("object", objects);
    return (
      <>
        <div className="d-none">
          <div ref={this.contractPDF}>
            <Template selected={selected} />
          </div>
        </div>
        <NavBar2 />
        <div className="overflow-auto">
          <InfiniteScroll className="h-100" loadMore={this.loadMore.bind(this)}>
            <div className="p-3 p-lg-4">
              <h1 className="fw-bold mt-3 text-capitalize">Contract List</h1>
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
                  ["acl", "password", "createdAt", "updatedAt"]
                )}
                selected={selected}
                onSelect={this.onSelect.bind(this)}
                onSelectAll={this.onSelectAll.bind(this)}
                progress={progress}
                onClickItem={this.onClickItem.bind(this)}
                className="mt-3"
                actions={[
                  {
                    label: "Edit",
                    onClick: this.onClickItem.bind(this),
                    className: "btn btn-primary ms-2",
                  },
                  {
                    label: "Print Contract",
                    onClick: this.onClickExport.bind(this),
                    className: "btn btn-primary ms-2",
                  },
                ]}
              />
            </div>
          </InfiniteScroll>
        </div>
        <div className="position-fixed bottom-0 end-0 m-4">
          <Button
            className="shadow-sm bg-primary btn btn-primary"
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

export default withRouter(ContractPage);
