import React from "react";
import Card from "../Card";

const ProjectCard = (props) => {
    const defaultProjectName = "Test Project";
    const defaultProjectPhotoUrl = "https://via.placeholder.com/200x200"
    const defaultProjectPhotoAltText = "A Default project placeholder photo"
    const defualtProjectDescription = "Please check that this card initialized properly"
    return <Card className="Project Card">
        <h3 className="project-name">{props.projectName || defaultProjectName}</h3>
        <img className="project-photo"
             src={props.photoUrl || props.defaultProjectPhotoUrl}
             alt={props.photoAlt || props.defaultProjectPhotoAltText} />
        <p>{props.projectDescription || defualtProjectDescription}</p>
    </Card>
}
export default ProjectCard;