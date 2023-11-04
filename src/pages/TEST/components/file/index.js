import React from "react";

function Template({ object }) {
  return (
    <>
      <div>MWEEB</div>
      <div>HARD CODED FOR NOW</div>

      <div>{object.date}</div>
      <div>{object.title}</div>
      <div>{object.companyName}</div>
      <div>{object.clientName}</div>
      <div>{object.companyName}</div>
      <div>{object.companyAddress}</div>
      <div>{object.clientPosition}</div>
    </>
  );
}

export default Template;
