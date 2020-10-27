import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import client from "./customAxios";

import * as consts from "./constants";

const { REACT_APP_GITHUB_CLIENT_ID } = process.env;

function Admin(props) {
  const [authUrl, setAuthUrl] = useState(null);
  console.log("admin props", props);

  if (props.loading) {
    return <div>app is initializing...</div>;
  }
  if (props.user.error) {
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
    return <div>{props.user.login}</div>;
  }
}

export default connect((state) => {
  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    auth: state.auth,
    githubAuth: state.githubAuth,
  };
}, {})(Admin);
