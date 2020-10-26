import React from "react";
import { func } from "prop-types";
import { useState, useEffect } from "react";

import client from "../customAxios";

const Context = React.createContext({});

function UserContext(props) {
  const [context, updateContext] = useState({
    user: null,
    loading: true,
    reload: false,
    initialized: false,
    error: false,
    reload_user: () => updateContext({ ...context, reload: true }),
  });
  // get the user on mount
  useEffect(() => {
    console.log("usercontext get admin user");
    client
      .get("/admin/user")
      .then((response) => {
        console.log("userContext", response.data);
        updateContext({
          ...context,
          user: response.data,
          loading: false,
          reload: false,
        });
      })
      .catch((e) => {
        if (e.response.status === 401) {
          console.log("please log in");
        } else {
          console.error("userContext", e);
        }
        updateContext({
          ...context,
          loading: false,
          reload: false,
          error: true,
        });
      });
  });
  useEffect(() => {
    updateContext({ ...context, loading: true });
    client.get("/admin/user").then((response) => {
      console.log("get admin user", response);
    });
  }, [context.reload]);
  console.log("userContext");
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export function connectUser(Component) {
  return function UserConnected(props) {
    return (
      <Context.Consumer>
        {(context) => {
          return (
            <Component
              {...props}
              user={context.user}
              user_loading={context.loading}
              reload_user={context.reload_user}
              test="hello"
            />
          );
        }}
      </Context.Consumer>
    );
  };
}
UserContext.connectUser = connectUser;
export default UserContext;
