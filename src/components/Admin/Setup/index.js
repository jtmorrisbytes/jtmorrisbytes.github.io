import React, { useState, useEffect } from "react";
import Routes from "./routes";

export const path = "/setup";
export function Component(props) {
  const { user, setUserView } = useState(null);
  //   check if the user has already been setup
  return (
    <div>
      <Routes {...props} />
    </div>
  );
}
export default Component;
