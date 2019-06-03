/*
    Nav.js

    The main navigation for the webpage


*/
import React from "react"
import "./Nav.css"


class Nav extends React.Component {
    constructor(){
        super()
    }
    render(){
        return <nav id="main-navigation">
            <div id="brand">
                <p className="logo-text">JordanTMorris.com</p>
            </div>
            <div id="nav-links">
                <a id="about" href="#about">About</a>
                <a id="projects" href="#projects">Projects</a>
            </div>

        </nav>
    }
}
export default Nav