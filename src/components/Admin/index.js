import React, { useEffect, useState } from "react";
import client from "./customAxios";
import Axios from "axios";
import { Route } from "react-router-dom";
import Admin from "./Admin";
import Verify from "./Verify";
import store, { appInitAsync } from "./store";

import { Provider } from "react-redux";

const { REACT_APP_CLIENT_ID } = process.env;

function AdminApp(props) {
  const { path } = props.match;
  console.log("path", path);
  useEffect(() => {
    store.dispatch(appInitAsync());
  }, []);
  if (props.loading === true) {
    return <div>loading</div>;
  }
  return (
    <div className="Admin">
      <Provider store={store}>
        <Route path={path} exact component={Admin} />
        <Route path={path + Verify.path} component={Verify} />
        <Route>hello</Route>
      </Provider>
    </div>
  );
}
export default AdminApp;
