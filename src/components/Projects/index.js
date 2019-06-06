import React from "react"
import Card from "../Card"
import "./Projects.css"
import ProjectCard from "../ProjectCard"
import CodePenEmbedded from "react-codepen-embed"





const Projects = (props) => {
    // TODO: Add data source for all projects

    const projectMockObject = {
        name:"",
        description:"",
        photoUrl:"",
        photoAltText:"",
    }
    let projects = []
    for(let i=0; i< 10; i++) {
        console.log(i)
        let newMockObject = Object.assign({
            name:"Test Project " + i,
            description:"A test Project number " + i,
            photoAltText: "A test Project photo for project number " + i
        },projectMockObject)
        projects.push(
        <ProjectCard name={projectMockObject.name} key={"test-project-"+i}/>)
    }
    console.log(projects)

    return <Card id="Projects">
            {/* <h2 id="header">My Projects</h2> */}
            <div id="projects-grid">
                {/* <CodePenEmbedded hash={"qvQqwb"} user={"jtmorrisbytes"} /> */}
                {/* I am placing a few default project cards here until layout is finalized*/}
                { projects }

            </div>
    </Card>
}
export default Projects