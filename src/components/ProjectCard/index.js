import React from "react";
import Card from "../Card";
import "./ProjectCard.css"
import PropTypes from "prop-types"
import request from "superagent"
// IDEA: Embed a live view of the project directly into the card
// 



class ProjectCard extends React.Component {
    state = {
        loading:null,
        photoUrl:null,
        sourceUrl:null,
        liveUrl:this.props.liveUrl || null
    }
    defaults = {
        projectName : "Test Project",
        photoUrl : "https://via.placeholder.com/800x450",
        photoAltText: "A Default project placeholder photo"
    }
    render = () => {
        if(this.state.loading) {
            return (<Card className='project-card'><h2>Loading data for project {this.props.name}. please wait</h2></Card>)
        }
        else {
            return <Card className="project-card">
            <h2 className="project-name">{this.props.name || this.defaults.projectName}</h2>
            {
                (this.props.photoUrl || this.state.photoUrl) ?
                (<img className="project-photo"
                 src={this.state.photoUrl || this.props.photoUrl ||  this.defaults.photoUrl}
                 alt={this.props.photoAlt || this.defaults.photoAltText} />
                ): void 0
            }
            
            <p>{this.props.description}</p>
            <div className="source-links">
                { this.state.liveUrl ? (<a type='button' rel="noopener noreferer"
                      target={"_blank"} href={this.state.liveUrl}>Live View</a>)
                     : void 0
                    }
                {
                    this.props.sourceUrl ? 
                    (<a type='button' rel="noopener noreferer"  target={"_blank"} href={this.props.sourceUrl}>View Source</a>)
                    : void 0
                }
                
            </div>
        </Card>
        }





    }
    componentDidMount() {
        this.setState({...this.state, loading:true})
        request.get(`https://raw.githubusercontent.com/${this.props.login}/${this.props.name}/master/project-info.json?token=${this.props.accessToken}`)
        .set('accept',"application/json")
        .end((error,response) =>{
            console.log("PROJECT_CARD RESPONSE, ERROR", response,error)
            if(error) {
                if (error.status === 401) {
                    console.error("AUTHORIZATION_ERROR_WHILE_RETRIEVING_PROJECT_DATA",error.body || error.text)
                    return;
                }
                else if(error.status === 404) {
                    // file not found. set loading to false and set defaults. disable the source url button or hide it altogether
                    this.setState({...this.state,
                        loading:false
                    })
                    return;
                }
            }
            else if (response) {
                
                if (response.body) {
                    if(response.body.liveUrl) {
                        this.setState({...this.state, liveUrl:response.body.liveUrl})
                    }
                }
                else if(response.text){
                    this.setState({...this.state,...JSON.parse(response.text)})
                }
            }
            else {
                if(!response) {
                    console.error("NO_RESPONSE")
                }

            }
            
        // processing finished, set loading to false;
        this.setState({...this.state, loading:false})
        })


    }
    



}
ProjectCard.propTypes = {
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    liveUrl:PropTypes.string.isRequired,
    sourceUrl:PropTypes.string.isRequired
    // cardType: PropTypes.oneOf(["codepen", "github"])
}
export default ProjectCard;