import React from "react"
import Card from "../Card"
const Projects = (props) => {
    // TODO: Add data source for all projects

    const projectMock = {
        name:"jtmorrisbytes.github.io",
        description:"",
        photoUrl:""
    }
    return <Card id="Projects">
            <h2>My Projects</h2>
            <div id="projects-grid">

            </div>
    </Card>
}
export default Card