import React, { useEffect, useState } from "react";

import client from "../../customAxios";

export default function LocalProjects(props) {
  const [localProjects, updateProjects] = useState(null);
  // get localProjects on load
  useEffect(() => {
    client
      .get("/api/projects")
      .then((response) => {
        // dont assume the response is the correct
        // data type.
        if (Array.isArray(response.data)) {
          updateProjects(response.data);
        }
      })
      .catch((e) => {
        // false value means failure
        updateProjects(false);
      });
  });

  if (localProjects == null) {
    return <div>loading... please wait</div>;
  } else if (localProjects === false) {
    return <div>Error occurred.. please see console</div>;
  } else if (localProjects.length === 0) {
    return <div>No localProjects! go ahead and add one from github</div>;
  }
}
