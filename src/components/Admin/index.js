import React, { useEffect, useState } from "react";

import { Route } from "react-router-dom";
import Admin from "./Admin";
import Verify from "./Verify";
import store, { initAppAsync } from "./store";

import { Provider } from "react-redux";
import Loading from "./Loading";
import Login from "./Login";
import GithubErrorHandler from "./Error/github";
import AppErrorHandler from "./Error";
import UserErrorHandler from "./Error/user";
import Identities from "./Identities";
import CreateIdentity from "./Identities/Identity/create";

const { REACT_APP_CLIENT_ID } = process.env;

function AdminApp(props) {
  const { path } = props.match;
  console.log("path", path);
  useEffect(() => {
    store.dispatch(initAppAsync()).then(() => {});
  }, []);
  // if the app crashed: check the global error state

  return (
    <div className="AdminApp">
      <Provider store={store}>
        <Route path={path + Login.path} component={Login} />
        <Route path={path + Verify.path} component={Verify} />
        <AppErrorHandler>
          <GithubErrorHandler>
            <UserErrorHandler>
              <Loading>
                <Route path={path} exact component={Admin} />
                <Route path={path + "/ident/:id"} component={Identities} />
                <Route
                  path={path + "/createident"}
                  component={CreateIdentity}
                />
              </Loading>
            </UserErrorHandler>
          </GithubErrorHandler>
        </AppErrorHandler>
      </Provider>
    </div>
  );
}
export default AdminApp;
