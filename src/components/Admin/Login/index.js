import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { startAuthFlowAsync } from "../store/github";

const { REACT_APP_GITHUB_CLIENT_ID } = process.env;

function Login(props) {
  const [windowRef, setWindowRef] = useState(null);
  useEffect(() => {
    props.startAuthFlowAsync().then(() => {
      console.log("ready to redirect");
    });
  }, []);
  useEffect(() => {
    if (window) {
      console.log("window is open");
    }
  });
  if (props.state == null) {
    return <div>Please wait...</div>;
  }
  return (
    <div className="Login">
      Please{" "}
      <button
        onClick={() => {
          setWindowRef(
            window.open(
              props.oAuthFlowStartUrl
                .replace("${client_id}", REACT_APP_GITHUB_CLIENT_ID)
                .replace("${state}", props.state || ""),
              "_blank"
            )
          );
        }}
      >
        Log in
      </button>{" "}
      to use this app
    </div>
  );
}
Login = connect(
  (state) => {
    return { ...state.github };
  },
  { startAuthFlowAsync }
)(Login);
Login.path = "/login";

export default Login;
