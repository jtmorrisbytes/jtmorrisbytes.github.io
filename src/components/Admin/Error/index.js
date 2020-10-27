import React from "react";
import { connect } from "react-redux";
import UserErrorHandler from "./user";
import GithubErrorHandler from "./github";

function AppErrorHandler(props) {
  if (props.error) {
    return <div>unrecoverable app error</div>;
  } else {
    return <>{props.children}</>;
  }
}

export default connect((state) => {
  return {
    error: state.error,
  };
}, {})(AppErrorHandler);
