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
    const objects = this.state.objects;
    console.log("objects", objects);
    return (
      <>
        <NavBar2 />
        <div className="container">
          <div className="row align-items-center">
            {objects.map((object, index) => (
              <ContractCard
                className="col-md-4"
                object={object}
                onClickView={() => this.onClickView(index)}
                key={index}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ViewContract);
