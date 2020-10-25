import React, { useState, useEffect } from "react";

import client from "../../customAxios";

const Container = (props) => <div id={"UserPreview"}>{props.children}</div>;

export default function UserPreview(props) {
  const [user, setUserView] = useState(null);
  // load user on mount
  useEffect(() => {
    client
      .get("/api/user")
      .then((response) => {
        if (
          !Array.isArray(response.data) &&
          typeof response.data === "object"
        ) {
          setUserView(response.data);
        } else {
          console.error(
            "UserPreview got an invalid response data type on mount",
            typeof response.data
          );
          console.error(response.data);
          setUserView(false);
        }
      })
      .catch((e) => {
        console.error(e);
        setUserView(false);
      });
  }, []);

  if (user == null) {
    return <Container>Loading...</Container>;
  } else if (user === false) {
    return <Container>Error loading user.</Container>;
  }

  return <Container>{user.firstName}</Container>;
}
