import React from "react";
import { Route } from "react-router-dom";

import * as Setup from "./Setup";

import UserContext from "./User/context";
import Admin from "./Admin";
import Verify from "./Verify";

export default function Routes(props) {
  const { path } = props.match;
  console.log(path);
  return (
    <>
      <Route path={path} exact component={Admin} />
      <Route path={path + Verify.path} component={Verify} />
    </>
  );
}
