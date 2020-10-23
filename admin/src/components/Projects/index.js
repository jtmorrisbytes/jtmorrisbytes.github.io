import React, { useState, useEffect } from "react";

import client from "../../customAxios";

import LocalProjects from "./Local";
import GithubProjects from "./Github";
import { Route } from "react-router-dom";

export default function Projects(props) {
  const { localProjects, updateLocalProjects } = useState(null);

  return (
    <div>
      <button>add project</button>
    </div>
  );
}
