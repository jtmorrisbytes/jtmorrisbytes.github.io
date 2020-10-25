import React, { useEffect, useState } from "react";

import client from "../../customAxios";

export default function GithubProjects(props) {
  const [githubProjects, updateProjects] = useState(null);
  // get githubProjects on load
  useEffect(() => {
    client
      .get("/api/admin/github/projects")
      .then((response) => {
        // dont assume the response is the correct
        // data type.
        if (Array.isArray(response.data)) {
          updateProjects(response.data);
        } else {
          console.log("response is not an array", response.data);
          updateProjects(false);
        }
      })
      .catch((e) => {
        // false value means failure
        updateProjects(false);
      });
  }, []);

  if (githubProjects == null) {
    return <div>loading... please wait</div>;
  } else if (githubProjects === false) {
    return <div>Error occurred.. please see console</div>;
  } else if (githubProjects.length === 0) {
    return <div>No githubProjects! go ahead and create one</div>;
  } else {
    return (
      <div>
        {githubProjects.map((project) => {
          //projects arent visible to the public
          //if they are marked as private
          if (project.private) {
            return null;
          }
          return (
            <div key={project.id}>
              <h5>
                <a href={project.html_url}>{project.name}</a>
              </h5>
              <p>{project.description || "No description provided"}</p>
              {project.homepage ? (
                <a href={project.homepage}>homepage</a>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}
