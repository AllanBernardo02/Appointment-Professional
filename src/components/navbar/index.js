import React from "react";
import { NavBar as Nav, Layout } from "nq-component";

function NavBar(props) {
  const { collapsed, setCollapse } = React.useContext(Layout.Context);

  function onClickNavigate() {
    setCollapse(!collapsed);
  }
  return (
    <Nav
      className="shadow-sm"
      title="APPTIMIZER"
      {...props}
      logo=""
      onClickNavigate={onClickNavigate}
    />
  );
}

export default NavBar;
