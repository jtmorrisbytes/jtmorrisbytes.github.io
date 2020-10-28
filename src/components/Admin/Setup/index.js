import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Octokit } from "@octokit/rest";

function updateInput(updaterFn) {
  return (event) => {
    updaterFn(event.target.value);
  };
}

// NOTE PAT === Personal Access Token

export const path = "/setup";
export function Setup(props) {
  console.log("Setup props", props);
  const [githubPAT, setGithubPAT] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [youtubeChannelHash, setYoutubeChannelHash] = useState("");
  const [linkedinUsername, setLinkedInUsername] = useState("");
  // refresh profile info based on PAT
  useEffect(() => {
    // the magic number is the length
    // of a personal access token according to
    // https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html
    if (githubPAT?.length >= 20) {
      // create client based on PAT
      const octo = new Octokit({ auth: githubPAT });
      // try to get the user based on the token
      octo.users
        .getAuthenticated()
        .then((response) => {
          // this operation may not throw on a response.status >= 200
          // because of github's method of returning errors in the body
          // it is neccessary to check the response status in the body
          if (response?.data.status && response?.data.status !== 200) {
            console.warn(
              "error while getting data from supplied PAT",
              response.data
            );
          } else {
            console.log(
              "get authenticated user from githubPAT success",
              response.data
            );
            let user = response.data;
            setUsername(user.login);
            setEmail(user.email);
            let [firstName, lastName] = user.name.split(" ");
            setFirstName(firstName);
            setLastName(lastName);
          }
        })
        .catch((error) => {
          console.error("error getting user from PAT", error);
          if (error.status === 401) {
            alert("Personal Access Token is expired or invalid");
          }
          console.dir(error);
        });
    }
  }, [githubPAT]);
  return (
    <form>
      <div className="formgroup">
        <h3>Configuration Data</h3>
        <div className="inputgroup">
          <label htmlFor="github_pat">Github PAT</label>
          <input
            id="github_pat"
            type="password"
            autoComplete="current-password"
            name="github_pat"
            required
            value={githubPAT}
            onChange={(e) => {
              setGithubPAT(e.target.value);
            }}
          />
        </div>
        <div className="inputgroup">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            disabled
            placeholder={"username"}
            // hidden
          />
        </div>
      </div>

      <div className="formgroup">
        <h3>Personal Info</h3>

        <h4>Name</h4>
        <input
          type="text"
          name="first"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <input type="text" name="last" value={lastName} />

        <div className="inputgroup">
          <label>Phone</label>
          <input type="tel" name="phone" />
        </div>
        <div className="inputgroup">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={email} />
        </div>
      </div>

      {/* profile links */}
      <div className="formgroup">
        <h3>Profile links</h3>
        <label htmlFor="github_username">https://www.github.com/</label>
        <input
          id="github_username"
          type="text"
          name="github_username"
          placeholder="Github profile URL"
          defaultValue={username}
        />
        <div className="inputgroup">
          <label>https://www.youtube.com/</label>
          <input
            type="text"
            name="youtube_channel"
            required
            value={youtubeChannelHash}
          ></input>
        </div>
        <div className="inputgroup">
          <label>https://linkedin.com/in/</label>
          <input
            type="text"
            name="linkedin_username"
            required
            value={linkedinUsername}
          />
        </div>
      </div>
    </form>
  );
}

Setup = connect((s) => s, {})(Setup);
Setup.path = path;
export default Setup;
