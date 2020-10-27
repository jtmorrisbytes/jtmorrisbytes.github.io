import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import client from "./customAxios";

import { initAppAsync } from "./store";

import * as consts from "./constants";

function Admin(props) {
  // perform app startup
  // console.log("admin props", props);
  return <div>hello from admin</div>;
}

export default connect((s) => s, { initAppAsync })(Admin);
