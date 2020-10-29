import React from "react";

import * as consts from "../constants";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

function GithubErrorHandler(props) {
  console.log("githubErrorHandler", props);
  switch (props.error) {
    case consts.LOGIN_REQUIRED_ERROR:
      // force a redirect to the login screen
      return <Redirect to="/admin/login" />;
    default:
      console.log("github error handler default case");
      return (
        <>
          {props.children.length}
          {props.children}
        </>
      );
  }
}

export default connect((state) => {
  return { error: state.github.error };
})(GithubErrorHandler);
