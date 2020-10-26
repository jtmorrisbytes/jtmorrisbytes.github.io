import React, { useEffect, useState } from "react";
import client from "../customAxios";
import { Link, Redirect } from "react-router-dom";

export const path = "/verify";

const { REACT_APP_GITHUB_CLIENT_ID } = process.env;

function Verify(props) {
  const query = new URLSearchParams(
    props.location.search || window.location.search
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    if (query.has("code")) {
      client
        .post(
          `/admin/login/verify/access_code?client_id=${REACT_APP_GITHUB_CLIENT_ID}&code=${query.get(
            "code"
          )}`
        )
        .then((response) => {
          console.log(response);
          if (response?.data && !response?.data?.error) {
            return Promise.resolve(response.data);
          } else {
            return Promise.reject(response);
          }
        })
        .then((data) => {
          return client
            .post(
              `/admin/login/verify/access_token?client_id=${REACT_APP_GITHUB_CLIENT_ID}&token_type=${data.token_type}`,
              { access_token: data.access_token }
            )
            .then((response) => {
              console.log(response);
            });
        })
        .catch((e) => {
          if (e?.response?.data?.error) {
            const { error, error_description } = e.response.data;
            console.error(error, error_description);
            setError({ error, error_description });
          } else {
            console.error("Verify: unhandled error", e);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (success?.access_token) {
      console.log();
    }
  }, [success]);
  if (error) {
    return <Redirect to={"."} strict={true} />;
  } else if (success) {
    return <div>Verify Success {success.access_token}</div>;
  } else if (query.has("code")) {
    return <div>please wait..</div>;
  } else {
    return <Redirect to={"/"} />;
  }
}
Verify.path = path;
export default Verify;
