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

class ViewPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new ViewPresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
      selectedDate: null, // Track the selected date
      timeSlots: null,
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

  getTimeSlots = () => {
    const { objects, selectedDate } = this.state;

    console.log("Mali", selectedDate);

    if (selectedDate) {
      const filteredObjects = objects.filter((o) => {
        const date = new Date(o?.date);
        return date.toLocaleDateString().includes(selectedDate);
      });

      if (filteredObjects.length > 0) {
        return filteredObjects[0].time.map((t) => (
          <ul key={t}>
            <label>
              <input
                type="radio"
                name="timeSlot"
                value={t}
                onChange={this.handleTimeSlotChange}
              />
              {t}
            </label>
          </ul>
        ));
      }
    }
    return null;
  };

  tileClassName = ({ date }) => {
    const { objects } = this.state;
    const formattedDate = new Date(date).toLocaleDateString();
    console.log("hihih", formattedDate);

    const hasTimeSlots = objects.some((object) => {
      const formatted = new Date(object?.date).toLocaleDateString();
      return formattedDate.includes(formatted);
    });
    console.log("hehehe", hasTimeSlots);

    return hasTimeSlots ? "highlighted-date" : "";
  };

  render() {
    const { objects, selectedDate } = this.state;
    console.log("Time red", selectedDate);

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
            className="mt-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className="mt-3"
              style={{ backgroundColor: "white", padding: "20px" }}
            >
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

export default ViewPage;
