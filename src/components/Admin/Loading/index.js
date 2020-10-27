import React from "react";
import { connect } from "react-redux";
// this is the global loading handler
function Container(props) {
  return <div className="Loading">{props.children}</div>;
}

function Loading(props) {
  console.log("Loading", props);
  if (props.app) {
    return <Container>Starting Up...</Container>;
  } else return <>{props.children}</>;
}
export default connect((state) => {
  return { app: state.app.loading };
}, {})(Loading);
