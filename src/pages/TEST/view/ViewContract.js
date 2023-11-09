import React from "react";
import NavBar2 from "../../../components/navbar2";
import { findObjectUseCase } from "../../../usecases/object";
import withRouter from "../../../withRouter";
import ContractCard from "../components/card/ContractCard";
import ViewContractPresenter from "./ViewContractPresenter";
import BasePage from "../../../base/BasePage";

class ViewContract extends BasePage {
  constructor(props) {
    super(props);
    this.presenter = new ViewContractPresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
    };
  }

  getCollectionName() {
    return "contractDetails";
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  setContracts(objects) {
    this.setState({ objects });
  }

  onClickView(index) {
    const object = this.state.objects[index];
    this.navigateTo("/contract/" + object.id);
  }

  render() {
    const styles = {
      borderLeft: "100vw solid transparent",
      borderTop: "50vw solid black",
      marginTop: "-3.5vw",
      width: 0,
      height: 0,
    };
    return (
      <>
        <div>
          <div className="">
            <div className="d-flex justify-content-end p-2">
              <h6 className="fs-sm">mweeb.com</h6>
            </div>
          </div>
        </div>
        <div className="" style={styles}></div>
      </>
    );
  }
}

export default withRouter(ViewContract);
