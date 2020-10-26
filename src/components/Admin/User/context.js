import React from "react";
import { func } from "prop-types";
import { useState, useEffect } from "react";

import client from "../customAxios";

const Context = React.createContext({});

function UserContext(props) {
  const [context, updateContext] = useState({
    user: null,
    loading: true,
    initialized: false,
  });
  // get the user on mount
  useEffect(() => {
    client
      .get("/admin/user")
      .then((response) => {
        console.log("userContext", response.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          console.log("please log in");
        } else {
          console.error("userContext", e);
        }
      });
  });
  console.log("userContext");
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export function connectUser(Component) {
  return function UserConnected(props) {
    return (
      <Context.Consumer>
        {(context) => {
          return <Component {...props} user={context.user} test="hello" />;
        }}
      </Context.Consumer>
    );
  };
}
UserContext.connectUser = connectUser;
export default UserContext;
