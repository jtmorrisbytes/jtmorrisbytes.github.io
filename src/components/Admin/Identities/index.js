import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Container = (props) => <div id={"UserPreview"}>{props.children}</div>;

export default function Identities(props) {
  return (
    <Container>
      {props.children}
      <Link to="/admin/createident">+</Link>
      {props.length > 0
        ? props.data.map((identity) => {
            return <div>{JSON.stringify(identity)}</div>;
          })
        : "No Identities Found"}
    </Container>
  );
}
