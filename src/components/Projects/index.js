import React from "react"
import Card from "../Card"
import "./Projects.css"
import ProjectCard from "../ProjectCard"
// import axios from "axios"
import superagent from "superagent"





const PaginationControls = ( props ) => {
    const noOp = () => {console.log("this element does nothing")}
    let style = {
        button : {
            enabled: {
                cursor: "pointer",
                fontSize:"1.25em",
                width:"1.25em"
            },
            disabled :{
                cursor: "not-allowed",
                visibility:"hidden"
            }
        }
    }
    return (
        <div style={{display:"flex", justifyContent:"space-between", fontSize:"1.25em"}} id='pagination-controls'>
            <button style={(props.hasPreviousPage && !props.loading) ? style.button.enabled : style.button.disabled} type="button" onMouseUp={props.previousPageAction || noOp}> &lt; </button>
            <div style={{display:"inline-flex"}}id='items-per-page-controls'>
            <button style={(props.decreaseItemsPerPageAction && props.canDecreaseItemsPerPage) ? style.button.enabled: style.button.disabled}
                    type='button' onMouseUp={props.decreaseItemsPerPageAction || noOp}><label>-</label></button>
                <label style={{fontSize:"1rem",display:"inline",marginLeft:"0.25em",marginRight:"0.25em", textAlign:"center",paddingTop:"0.25em"}}id='num-items-per-page'>Items Per Page : {props.itemsPerPage || "?"}</label>
                <button style={(props.increaseItemsPerPageAction && props.canIncreaseItemsPerPage) ? style.button.enabled: style.button.disabled}
                    type='button' onMouseUp={props.increaseItemsPerPageAction || noOp}><label>+</label></button>
            </div>
            <button style={(props.hasNextPage && !props.loading) ? style.button.enabled: style.button.disabled} type="button" onMouseUp={props.nextPageAction || noOp}> &gt;</button>
        </div>
    );
}

class Projects extends React.Component {
    minItemsPerPage = 2
    maxItemsPerPage = 8

    state = {
        repositories:null,
        loading:null,
        error:null,
        itemsPerPage:this.props.itemsPerPage || 4,
        previousCursor:[],
        cursor:null,
        nextCursor:null,
        shouldFetchRepositories:true
    }
    componentDidMount() {
        // set event listeners to ensure that you are online

        // initialize repository data
        window.Projects = this;
        this.setState({...this.state,loading:true}, this._fetchRepositories)     
    }
    componentDidUpdate() {
        // if (this.state.shouldFetchRepositories) {
        //     this._fetchRepositories()
        //     this.setState({...this.state, shouldFetchRepositories:false})
        // }
    }

    render() {
    // if (this.state.repositories) console.log(this.state.repositories.edges) ;
    // console.log(projects)
    return (<Card id="Projects">
            <h1 class="header">My Projects</h1>
            {/* the container for the projects */}
            <div class="container" >
                {/* this will house the project cards */}
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
                <ProjectCard></ProjectCard>
            </div>
    </Card>)
    }
}



export default Projects