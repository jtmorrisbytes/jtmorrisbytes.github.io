import React from "react";
import "./Banner.css";
import Card from "../Card";
// import GithubLogo from "../../assets/img/GitHub_Logo.png"
import GithubMark from "../../assets/img/GitHub-Mark/PNG/GitHub-Mark-120px-plus.png";
import LinkedInLogo from "../../assets/img/LinkedIn-Logos/In/Digital/Blue/1x/In-Blue-128.png";

import { connect } from "../../lib/userContext";

const Banner = (props) => {
  return (
    <Card id="Banner">
      <a id="to-about"></a>
      <div id="about-container">
        <h1 id="name">{props.user.name}</h1>
        {/* add padding after the name */}
        {/* <div className="subheading"> */}
        <h2 id="job-scope">Full Stack</h2>
        <h3 id="job-title">Web Developer</h3>
        {/* </div> */}
        <div id="profile-links">
          <a id="github-profile" href={props.user.html_url}>
            {/* attempt to use a image set */}
            <img id="github-logo" src={GithubMark} alt="github-logo" />
          </a>
          <a
            id="linkedin-profile"
            href={`https://www.linkedin.com/in/${props.user.login}/`}
          >
            <img id="linkedin-logo" src={LinkedInLogo} alt="Linked In" />
          </a>
        </div>
      </div>
    </Card>
  );
};
export default connect(Banner);
