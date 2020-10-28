import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import client from "./customAxios";

import { initAppAsync } from "./store";

import * as consts from "./constants";
import Identities from "./Identities";
import UserView from "./User";

function Admin(props) {
  // perform app startup
  // console.log("admin props", props);
  return (
    <div>
      <UserView />
    </div>
  );
}

export default connect(
  (state) => {
    return { githubUser: state.github.data, identities: state.users.data };
  },
  { initAppAsync }
)(Admin);
