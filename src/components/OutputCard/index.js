import React from "react";

function OutputCard({ obj, time }) {
  const dateObject = new Date(obj.date);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="card rounded" style={{width: "380px"}}>
        <div className="card-header flex justify-content-between align-items-center text-center fw-bold">
          Schedule Viewer
        </div>
        <div className="p-2">Time Slots for {formattedDate}</div>
        {time.map((timeObj) => (
          <div className="card-body" key={timeObj}>
            <blockquote className="blockquote mb-0">
              <ul className="fs-5">
                <li>
                  <h6>{timeObj?.time}</h6>
                </li>
              </ul>
            </blockquote>
          </div>
        ))}
      </div>
    </>
  );
}

export default OutputCard;
