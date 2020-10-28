import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import client from "./customAxios";

import { initAppAsync } from "./store";

import * as consts from "./constants";
import Identities from "./Identities";

function Admin(props) {
  // perform app startup
  // console.log("admin props", props);
  return (
    <div>
      <header>
        <div className="githubName">{props.githubUser.name}</div>
        <img src={props.githubUser.avatar_url} alt="Github User Profile" />
      </header>
      <Identities data={props.identities}></Identities>
    </div>
  );
}

export default connect(
  (state) => {
    return { githubUser: state.github.data, identities: state.users.data };
  },
  { initAppAsync }
)(Admin);
