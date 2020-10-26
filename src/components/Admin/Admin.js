import React, { useState, useEffect } from "react";

import { connectUser } from "./User/context";
import { withRouter } from "react-router-dom";
import client from "./customAxios";
const { REACT_APP_GITHUB_CLIENT_ID } = process.env;

function Admin(props) {
  if (props.user == null) {
    return (
      <div>
        please log in...
        <button
          onClick={() => {
            window.open(
              `https://github.com/login/oauth/authorize?client_id=${REACT_APP_GITHUB_CLIENT_ID}`,
              "_top"
            );
          }}
        >
          login
        </button>
      </div>
    );
  } else {
    return <div>hello from admin... testing! {props.test}</div>;
  }
}
export default connectUser(Admin);
