import React from "react"
import Card from "../Card"
import ProjectCard from "./Project-Card"
const Projects = (props) => {
    // TODO: Add data source for all projects

    const projectMockObject = {
        name:"",
        description:"",
        photoUrl:"",
        photoAltText:"",
    }
    const projects = []


    return <Card id="Projects">
            <h2>My Projects</h2>
            <div id="projects-grid">
                {/* I am placing a few default project cards here until layout is finalized*/}
                { (() => {
                    let projects = []
                    for(let i=0; i> 20; i++) {
                        let projectMockObject = Object.assign({
                            name:"Test Project " + i,
                            description:"A test Project number " + i,
                            photoAltText: "A test Project photo for project number " + i
                        },projectMockObject)
                        projects.push(
                        <ProjectCard name={projectMockObject.name} key={"test-project-"+i}/>)
                    return projects
                    }
                })()}

            </div>
    </Card>
}
export default Card