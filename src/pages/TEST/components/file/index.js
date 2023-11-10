import React from "react";
import logo from "../../../../assets/img/logo.png";

function Template({ selected }) {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const whiteBoxStyle = {
    left: "8%",
    bottom: "10%",
    backgroundColor: "white",
    width: "500px",
    height: "700px",
    position: "relative",
    zIndex: 2,
    overflow: "hidden", // Hide overflow to keep the diagonal background within the white box
  };

  const diagonalStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 100vw 320px 0",
    borderColor: "transparent black transparent transparent",
    zIndex: 1,
  };

  const diagonalBackgroundStyle = {
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "400px 0 0 100vw",
    borderColor: "transparent transparent transparent #f0f0f0",
    zIndex: 1,
  };

  const diagonalFooterStyle = {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "200px 0 0 100vw",
    borderColor: "transparent transparent transparent black",
  };

  const textContainerStyle = {
    position: "absolute",
    top: "40px",
    right: "40px",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "16px",
    zIndex: 3,
  };

  const dateContainerStyle = {
    position: "absolute",
    top: "40px",
    right: "10%",
    textAlign: "right",
    fontSize: "25px",
    fontWeight: "bold",
  };

  const titleContainerStyle = {
    position: "absolute",
    top: "120px",
    right: "10%",
    textAlign: "right",
    fontSize: "45px",
    fontFamily: "Roboto, sans-serif",
    whiteSpace: "pre-wrap",
    fontWeight: "bold",
  };

  const logoHandlerStyle = {
    position: "absolute",
    top: "550px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    fontSize: "25px",
    right: "10%",
    textAlign: "right",
    fontWeight: "bold",
    letterSpacing: "1.2px",
    zIndex: "4",
  };

  const preparedForStyle = {
    position: "absolute",
    top: "850px",
    left: "7%",
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
    zIndex: 3,
  };

  const companyStyle = {
    position: "absolute",
    top: "880px",
    left: "7%",
    textAlign: "left",
    fontSize: "16px",
    zIndex: 3,
  };

  const nameStyle = {
    position: "absolute",
    top: "900px",
    left: "7%",
    textAlign: "left",
    fontSize: "16px",
    zIndex: 3,
  };

  const footerInfoStyle = {
    position: "absolute",
    top: "950px",
    left: "7%",
    textAlign: "left",
    fontSize: "16px",
    zIndex: 6,
    color: "white",
    fontWeight: "bold"   
  };

  return (
    <> 
      {selected.map((o, index) => (
        <div style={containerStyle} key={index}>
          <div style={diagonalStyle}></div>
          <div style={whiteBoxStyle}>
            <div style={dateContainerStyle}>
              {new Date(o.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div style={titleContainerStyle}>{o.title}</div>
            <div style={logoHandlerStyle}>
              <img src={logo} style={{ width: "130px", height: "120px", marginLeft: "72px", zIndex: 4 }} />
              Mweeb Information Technology Inc.
            </div>
            <div style={diagonalBackgroundStyle}></div>
          </div>
          <div style={textContainerStyle}>mweeb.com</div>
          <div style={preparedForStyle}>Prepared For: </div>
          <div style={companyStyle}>
            Company: <span style={{ fontWeight: "bold" }}>{o.companyName}</span>
          </div>
          <div style={nameStyle}>
            Name: <span style={{ fontWeight: "bold" }}>{o.clientName}</span>
          </div>
          <div style={footerInfoStyle}>
            <span>Andrew Tamayo</span>
            <span>andrew.tamayo@mweeb.com</span>
            <span>09098392156</span>
          </div>
          <div style={diagonalFooterStyle}></div>
        </div>
      ))}
    </>
  );
}

export default Template;
