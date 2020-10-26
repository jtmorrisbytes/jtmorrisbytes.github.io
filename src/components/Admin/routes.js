import React from "react";
import { Route } from "react-router-dom";

import * as Setup from "./Setup";

import UserContext from "./User/context";
import Admin from "./Admin";

export default function Routes(props) {
  const { path } = props.match;
  return (
    <>
      <Route path={path} exact component={Admin} />
    </>
  );
}
