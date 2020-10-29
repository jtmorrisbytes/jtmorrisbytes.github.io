import React from "react";

function LoginIframe(props) {
  return (
    <div className="Login">
      <iframe
        src={`https://www.github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`}
      ></iframe>
    </div>
  );
}

export default LoginIframe;
