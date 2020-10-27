import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import client from "./customAxios";

import * as consts from "./constants";

const { REACT_APP_GITHUB_CLIENT_ID } = process.env;

function Admin(props) {
  console.log("admin props", props);

  if (props.app.loading) {
    return <div>app is initializing...</div>;
  } else if (props.users.loading) {
    return <div>Loading users...</div>;
  } else if (props.users.error) {
    switch (props.user.error.error) {
      case consts.LOGIN_REQUIRED_ERROR:
        return (
          <div>
            please log in...
            <button
              onClick={() => {
                window.open(
                  props.githubAuth.oAuthFlowStartUrl
                    .replace("${client_id}", REACT_APP_GITHUB_CLIENT_ID)
                    .replace("${state}", props.auth.state || ""),
                  "_top"
                );
              }}
            >
              login
            </button>
          </div>
        );
      default:
        return <div>Unspecified user error</div>;
    }
  } else {
    return <div>{props.user.data.login}</div>;
  }
}

export default connect((s) => s, {})(Admin);
