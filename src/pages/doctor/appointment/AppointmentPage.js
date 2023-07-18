import React from "react";
import withRouter from "../../../withRouter";
import BaseListPage from "../../../base/BaseListPage";
import NavBar from "../../../components/navbar";
import BasePage from "../../../base/BasePage";
import { Table } from "nq-component";

class AppointmentPage extends BasePage {
  render() {
    const schema = this.getSchema("appointment");
    console.log("Schema", schema);
    return (
      <>
        <NavBar />
        <div className="m-5">
          <h4>My Appointments</h4>
        </div>
        <div>
          <Table
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
        </div>
      </>
    );
  }
}

export default withRouter(AppointmentPage);
