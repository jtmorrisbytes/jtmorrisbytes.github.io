import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { startAuthFlowAsync, getGithubUserAsync } from "../store/github";

import client from "../customAxios";
import github from "../Error/github";
import { Redirect } from "react-router-dom";

const { REACT_APP_GITHUB_CLIENT_ID } = process.env;

function Login(props) {
  const [success, setSuccess] = useState(null);

  const query = new URLSearchParams(
    props.location.search || window.location.search
  );
  console.log(
    window.parent === window,
    window.opener === window,
    window.top === window
  );
  const [windowRef, setWindowRef] = useState(null);

  function processMessage(event) {
    if (event.data?.source !== "react-devtools-content-script")
      console.log("event", event);

    if (event.data.reload) {
      window.reload();
    } else if (event.data.access_token && window.opener === null) {
      props
        .getGithubUserAsync(event.data.access_token)
        .then(() => {
          // maybe redirect from here?
          if (props.error) {
            console.log("Login getGithubUserAsync refresh failed");
          } else {
            console.log("Login getGithubuserAsync refresh succeeded ");
            setSuccess(true);
          }
        })
        .catch((e) => {
          console.log("Login getGithubUserAsync refresh threw");
        });
    }
  }
  useEffect(() => {
    window.addEventListener("message", processMessage);
    // let windowRef = window.open("/#/admin/login");
    // this is the parent window
    if (window.opener == null /* && document.hasFocus()*/) {
      props.startAuthFlowAsync().then((response) => {
        console.log("Login: startAuthFlow returned", response);
        let child = window.open(
          props.oAuthFlowStartUrl
            .replace("${client_id}", REACT_APP_GITHUB_CLIENT_ID)
            .replace("${state}", response.state)
        );
        if (child) {
          setWindowRef(child);
        }
      });
    } else if (window.opener && query.has("state") && query.has("code")) {
      let state = query.get("state"),
        code = query.get("code");
      client
        .post(
          `/admin/login/verify/access_code?client_id=${REACT_APP_GITHUB_CLIENT_ID}&state=${state}&code=${code}`
        )
        .then((r) => {
          if (window.opener) {
            window.opener.postMessage({ access_token: r.data.access_token });
            window.opener.focus();
            window.close();
          } else if (windowRef) {
            windowRef.close();
            setWindowRef(null);
          }
        })
        .catch((e) => {
          console.error("Login: ", e);
          if (window.opener) {
            window.postMessage({ reload: true }, "*");
          }
          window.close();
        });
    }
    return () => {
      window.removeEventListener("message", processMessage);
    };
  }, []);
  if (success === true) {
    return <Redirect to="/admin" />;
  } else if (success === false) {
    return <Redirect to="/" />;
  }
  return <div className="Login">Please wait...</div>;
}
Login = connect(
  (state) => {
    return {
      state: state.github.state,
      oAuthFlowStartUrl: state.github.oAuthFlowStartUrl,
      error: state.github.error,
      user: state.github.data,
    };
  },
  { startAuthFlowAsync, getGithubUserAsync }
)(Login);
Login.path = "/login";

export default Login;
