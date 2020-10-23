import React from "react";

import "./nav.scss";

import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav id="Nav" role="navigation">
      <Link to={"/projects"}>Projects</Link>
      <Link to={"/user"}>User</Link>
    </nav>
  );
}
