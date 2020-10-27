import React from "react";

import { connect } from "react-redux";

function UserErrorHandler(props) {
  console.log("HELLO", props);
  switch (props.error) {
    default:
      return <>{props.children}</>;
  }
}
export default connect((state) => {
  return { error: state.users.error };
}, {})(UserErrorHandler);
