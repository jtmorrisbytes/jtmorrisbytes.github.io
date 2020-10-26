import React, { useState, useEffect } from "react";

import { connectUser } from "./User/context";
import { withRouter } from "react-router-dom";
import client from "./customAxios";
const { REACT_APP_GITHUB_CLIENT_ID } = process.env;

function Admin(props) {
  const [authUrl, setAuthUrl] = useState(null);
  const [authState, setAuthState] = useState(null);
  const [requestedScopes, setRequestedScopes] = useState(null);
  useEffect(() => {
    client
      .get("/admin/login")
      .then((response) => {
        let { url, state, requestScopes } = response.data;
        setAuthUrl(url);
        setAuthState(state);
        setRequestedScopes(requestScopes);
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  if (props.user == null && authUrl) {
    return (
      <div>
        please log in...
        <button
          onClick={() => {
            window.open(
              authUrl
                .replace("${client_id}", REACT_APP_GITHUB_CLIENT_ID)
                .replace("${state}", authState || ""),
              "_top"
            );
          }}
        >
          login
        </button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default connectUser(Admin);
