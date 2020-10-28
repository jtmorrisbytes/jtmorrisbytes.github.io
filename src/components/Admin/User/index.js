import React from "react";

import { connect } from "react-redux";
import { ERROR_USER_NOT_FOUND } from "../constants";
import { Link, withRouter } from "react-router-dom";

function UserView(props) {
  console.log("userview props", props);
  if (props.user.error === ERROR_USER_NOT_FOUND) {
    return (
      <div>
        Please <Link to={props.match.path + "/setup/user"}>setup</Link> your
        user account
      </div>
    );
  } else if (props.user.data == null) {
    return <div>null</div>;
  } else {
    return <div>hello</div>;
  }
}
export default connect((s) => {
  return { user: s.user, github: s.github };
})(withRouter(UserView));
