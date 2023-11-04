import React from "react";
import BaseListPage from "../../../base/BaseListPage";
import withRouter from "../../../withRouter";
import ContractTemplatePresenter from "./ContractTemplatePresenter";
import { findObjectUseCase } from "../../../usecases/object";
import Template from "../components/file";
import printComponent from "../../../printComponent";

class ContractTemplate extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new ContractTemplatePresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
    };
    this.contractPDF = React.createRef();
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  getCollectionName() {
    return "contractDetails";
  }

  setContracts(objects) {
    this.setState({ objects });
  }

  onClickExport() {
    this.presenter.onClickExport();
  }

  exportPDF() {
    printComponent(this.contractPDF.current, "Contracts");
  }

  render() {
    const objects = this.state.objects;
    console.log("objects", objects);
    return (
      <>
        <div className="d-none">
          <div ref={this.contractPDF}>
            <div>
              {objects.map((object, index) => (
                <Template key={index} object={object} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary btn-sm text-white"
            onClick={this.onClickExport.bind(this)}
          >
            EXPORT
          </button>
          {objects.map((object, index) => (
            <div key={index}>
              <div>MWEEB</div>
              <div>HARD CODED FOR NOW</div>

              <div>{object.date}</div>
              <div>{object.title}</div>
              <div>{object.companyName}</div>
              <div>{object.clientName}</div>
              <div>{object.companyName}</div>
              <div>{object.companyAddress}</div>
              <div>{object.clientPosition}</div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default withRouter(ContractTemplate);
