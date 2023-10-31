import React from "react";
import BaseListPage from "../../../../base/BaseListPage";
import ViewPresenter from "./ViewPresenter";
import { findObjectUseCase } from "../../../../usecases/object";
import { Checkbox } from "nq-component";
import { Badge } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ViewPage.css";
import NavBar from "../../../../components/navbar";
import withRouter from "../../../../withRouter";
import OutputCard from "../../../../components/OutputCard";
// import avatar from "../../../../assets/img";
// import dialog from "nq-component/dist/Modal/dialog";

class ViewPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new ViewPresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
      selectedDate: null,
      timeSlots: [],
    };
  }

  getCollectionName() {
    return "schedules";
  }

  handleDateChange = (value) => {
    const selectedDate = value.toLocaleDateString();
    this.setState({ selectedDate });
    this.getTimeSlots(selectedDate);
    console.log("Selected Date:", selectedDate);
  };

  handleTimeSlotChange(event) {
    const selectedTime = event.target.value;
    console.log("timechange", selectedTime);
  }

  getTimeSlots = () => {
    const { objects, selectedDate } = this.state;

    if (!selectedDate) {
      return null;
    }

    const filteredObjects = objects.filter((o) => {
      const date = new Date(o?.date);
      return date.toLocaleDateString() === selectedDate;
    });

    if (filteredObjects.length === 0) {
      return null;
    }

    const firstObject = filteredObjects[0];

    if (!firstObject.time || firstObject.time.length === 0) {
      return null;
    }

    return (
      <div>
        <OutputCard obj={firstObject} time={firstObject.time} />
      </div>
    );
  };

  // openModal = async () => {
  //   const { selectedDate } = this.state;
  //   if (selectedDate) {
  //     const date = this.setState({ selectedDate });

  //     dialog.fire({})
  //   }
  // };

  tileClassName = ({ date }) => {
    const { objects } = this.state;
    const formattedDate = new Date(date).toLocaleDateString();
    // console.log("hihih", formattedDate);
    const hasTimeSlots = objects.some((object) => {
      const formatted = new Date(object?.date).toLocaleDateString();
      return formattedDate.includes(formatted);
    });
    // console.log("hehehe", hasTimeSlots);

    return hasTimeSlots ? "highlighted-date" : "";
  };

  render() {
    const { objects, selectedDate, timeSlots } = this.state;
    // console.log("Time select", selectedDate);
    // console.log("test")

    return (
      <>
        <NavBar />
        <div className="calendar-container mt-4">
          <Calendar
            onChange={this.handleDateChange}
            tileClassName={this.tileClassName}
          />
        </div>
        {selectedDate && (
          <div
            className=""
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="mt-3" style={{ padding: "20px" }}>
              {this.getTimeSlots() || (
                <p>No time slots available for the selected date.</p>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(ViewPage);
