import React from "react";

import { connect } from "react-redux";
import { ERROR_USER_NOT_FOUND } from "../constants";
import { Redirect } from "react-router-dom";

function UserErrorHandler(props) {
  console.log("HELLO", props);
  switch (props.error) {
    case ERROR_USER_NOT_FOUND:
      return (
        <>
          <Redirect to="/admin/setup" />
          {props.children}
        </>
      );
    default:
      return <>{props.children}</>;
  }
}
export default connect((state) => {
  return { error: state.user.error };
}, {})(UserErrorHandler);
