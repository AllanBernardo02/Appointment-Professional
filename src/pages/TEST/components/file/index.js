import React from "react";

function Template({ selected }) {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "200px", // Set your desired height
  };

  const diagonalStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 100vw 500px 0", // Adjust the values as needed
    borderColor: "transparent black transparent transparent",
  };

  const textContainerStyle = {
    position: "absolute",
    top: "50%",
    right: "10rem", // Adjust the right spacing
    transform: "translateY(-50%)",
    color: "white",
    fontSize: "16px", // Adjust the font size
  };
  return (
    <>
      <div style={containerStyle}>
        <div style={diagonalStyle}></div>
        <div style={textContainerStyle}>mweeb.com</div>
      </div>
    </>
  );
}

export default Template;
