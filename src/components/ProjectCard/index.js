import React from "react";
import Card from "../Card";
import "./ProjectCard.css"
import PropTypes from "prop-types"

// IDEA: Embed a live view of the project directly into the card
// 





const ProjectCard = (props) => {
    const defaultProjectName = "Test Project";
    const defaultProjectPhotoUrl = "https://via.placeholder.com/800x450"
    const defaultProjectPhotoAltText = "A Default project placeholder photo"
    // const defualtProjectDescription = "Please check that this card initialized properly"
    const defaultLiveUrl = "#";
    const defaultSourceUrl = "https://www.github.com/jtmorrisbytes/";
    return <Card className="project-card">
        <h2 className="project-name">{props.name || defaultProjectName}</h2>
        <img className="project-photo"
             src={props.photoUrl || defaultProjectPhotoUrl}
             alt={props.photoAlt || defaultProjectPhotoAltText} />
        {/* <p>{props.projectDescription || defualtProjectDescription}</p> */}
        <div className="source-links">
            <a type='button' rel="noopener noreferer"  target={"_blank"} href={props.liveUrl || defaultLiveUrl }>Live View</a>
            <a type='button' rel="noopener noreferer"  target={"_blank"} href={props.sourceUrl || defaultSourceUrl }>View Source</a>
        </div>
    </Card>
}
ProjectCard.propTypes = {
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    liveUrl:PropTypes.string.isRequired,
    sourceUrl:PropTypes.string.isRequired
    // cardType: PropTypes.oneOf(["codepen", "github"])
}
export default ProjectCard;