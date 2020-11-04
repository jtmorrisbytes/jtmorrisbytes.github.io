/*
    Nav.js

    The main navigation for the webpage


*/
import React from "react";
import "./Nav.css";

class Nav extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <nav id="main-navigation">
        <div className="navigation-container">
          <div id="brand">
            <p className="logo-text">Jordan Morris</p>
          </div>
          {/* <div id="nav-links"> */}
          <a id="projects" href="#Projects">
            Projects
          </a>
          <a id="about" href="#About">
            About
          </a>

          <a id="contact" href="#Contact">
            Contact
          </a>
          <a
            id="resume"
            href="https://docs.google.com/document/d/1mZWsT0AtRXaKzSc4xQb2AX0i0Dh22MHvXrDRbqjDgSY/edit?usp=sharing"
          >
            Resume
          </a>
          {/* </div> */}
        </div>
      </nav>
    );
  }
}
export default Nav;
