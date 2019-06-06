import React from "react"
import "./About.css"
import Card from "../Card/"
import GithubLogo from "../../assets/img/GitHub_Logo.png"
const About = (props) =>{
    return <Card id='About'>
            <a id="About"></a>
            <h1 id='name'>Jordan Morris</h1>
            {/* add padding after the name */}
            <div className="subheading">
                <h2 id='job-scope'>Full Stack</h2>
                <h3 id='job-title'>Web Developer</h3>
            </div>
            <div id="profile-links">
                <a id='github-profile' href="https://www.github.com/jtmorrisbytes"><img src={GithubLogo} alt='github-logo' /></a>
                <a id='linkedin-profile' href='https://www.linkedin.com/in/jtmorrisbytes'>LinkedIn</a>
            </div>
        
    </Card>
}
export default About;