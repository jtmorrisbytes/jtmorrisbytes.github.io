import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Octokit } from "@octokit/rest";
import user from "../Error/user";
import client from "../customAxios";

function updateInput(updaterFn) {
  return (event) => {
    updaterFn(event.target.value);
  };
}

const githubProfileEditUrl = "https://github.com/settings/profile";

export const path = "/setup";
export function Setup(props) {
  console.log("Setup props", props);
  const [phone, setPhone] = useState("");
  const [youtubeChannelHash, setYoutubeChannelHash] = useState("");
  const [linkedinUsername, setLinkedInUsername] = useState("");
  // refresh profile info based on PAT
  return (
    <div className="Setup">
      <h1>User Profile</h1>
      {/* profile image */}
      <img src={props.user.avatar_url} />
      {/* name */}
      <div className="name">{props.user.name}</div>
      {/* handle/username */}
      <div className="username">{props.user.login}</div>
      {/* email address */}
      <div className="email">{props.user.email}</div>
      {/* phone number */}
      <label for="phone">Phone Number </label>
      <input
        type="tel"
        autoComplete="cc-mobile"
        placeholder="Phone Number"
        defaultValue={props.user.phone_number}
      />
      <br />
      {/* general location (city, state) */}
      <label for="location">Location</label>
      {props.user.location ? (
        <div className={"location"}>{props.user.location}</div>
      ) : (
        <div className={"nolocation"}>
          No Location provided. to add one, Please do so on{" "}
          <a href={githubProfileEditUrl}>github.com</a>
        </div>
      )}
      {/* bio */}
      <label for="bio">Biography</label>
      {props.user.bio ? (
        <p className="bio">{props.user.bio}</p>
      ) : (
        <p className="nobio">
          No bio provided. To create a bio, Please do so on&nbsp;
          <a href={githubProfileEditUrl}>github.com</a>
        </p>
      )}
      {/* resume link */}
      <label for="resume">Resume Url </label>
      <input
        className="resume"
        type="url"
        placeholder="https://docs.google.com/"
      />
      {/* profiles */}
      <h2>Social Media Links</h2>
      {/* youtube */}
      <label for="youtube">Youtube Channel</label>
      <input
        id="youtube"
        type="url"
        name="youtube"
        placeholder="https://www.youtube.com/channel/XXXXX"
      />
      <br />
      {/* linkedin */}
      <label for="linkedIn">LinkedIn</label>
      <input
        id="linkedIn"
        type="url"
        name="linkedin"
        placeholder="https://linkedin.com/in/username"
      />
      {/* twitter ? */}
      {/* facebook */}
      <button
        onclick={(e) => {
          client
            .get(`/admin/user/${props.user.login}`)
            .then((response) => {
              // response succeded user exists

              client.patch(`/admin/user/${props.user.login}`, {
                ...response.data,
                ...props.user,
                phone,
                linkedin_username: linkedinUsername,
                youtube_channel_hash: youtubeChannelHash,
              });
            })
            .catch((error) => {
              if (error.response.status === 404) {
                // user not found or endpoint not found
                console.log("user not found, creating");
                client
                  .post("/admin/user", {
                    ...props.user,
                    phone,
                    linkedin_username: linkedinUsername,
                    youtube_channel_hash: youtubeChannelHash,
                  })
                  .then((response) => {
                    if (
                      response.status === 200 ||
                      response.status === 201 ||
                      response.status === 203
                    ) {
                      console.log("create user successful");
                    }
                  });
              } else {
                console.error("Error checking if user exists: ", error);
              }
            });
        }}
      >
        Create Profile
      </button>
    </div>
  );
}

Setup = connect((s) => {
  return { user: s.github.data };
}, {})(Setup);
Setup.path = path;
export default Setup;
