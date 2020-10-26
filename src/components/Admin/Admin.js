import React, { useState, useEffect } from "react";

import { connectUser } from "./User/context";
import { withRouter } from "react-router-dom";
import client from "./customAxios";
const { REACT_APP_GITHUB_CLIENT_ID } = process.env;

function Admin(props) {
  let query = new URLSearchParams(
    props.location.search || window.location.search
  );
  console.log(
    "checking query and user",
    `'${props.location.search}'`,
    window.location.search,
    query.get("code"),
    props.user
  );

  if (props.user == null && query.has("code")) {
    client
      .post(`/admin/login/verify?code=${query.get("code")}`)
      .then((response) => {
        // should have the token or verify that it was successful
        console.log("Verify success!");
      })
      .catch((e) => {
        console.error("Verify Failed!", e);
      });
    return <div>Please Wait...</div>;
  } else if (props.user == null) {
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
