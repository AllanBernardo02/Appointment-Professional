import React from "react";

function Template({ selected }) {
  return (
    <>
      <div>MWEEB</div>
      <div>HARD CODED FOR NOW</div>

      <div>{selected.date}</div>
      <div>{selected.title}</div>
      <div>{selected.companyName}</div>
      <div>{selected.clientName}</div>
      <div>{selected.companyName}</div>
      <div>{selected.companyAddress}</div>
      <div>{selected.clientPosition}</div>
    </>
  );
}

export default Template;
