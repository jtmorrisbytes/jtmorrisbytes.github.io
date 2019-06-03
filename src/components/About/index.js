import React from "react"
import "./About.css"
import Card from "../Card/"
import GithubLogo from "../../assets/img/GitHub_Logo.png"
const About = (props) =>{
    return <Card id='About'>
        <h1>Jordan Morris</h1>
        {/* add padding after the name */}
        <div className="subheading">
            <h2>Full Stack</h2>
            <h3>Web Developer</h3>
        </div>
        <div id="profile-links">
            <div id="github-profile" className='profile-link'>
                <img src={GithubLogo} alt='github-logo' />
            </div>
            <div id="linkedin-profile" className='profile-link'>
                <p className='link-text'></p>
            </div>
        </div>
        
    </Card>
}
export default About;