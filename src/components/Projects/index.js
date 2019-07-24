import React from "react"
import Card from "../Card"
import "./Projects.css"
import ProjectCard from "../ProjectCard"
// import axios from "axios"
import superagent from "superagent"



class Projects extends React.Component {
    state = {
        repositories:null,
        loading:null,
        error:null,
        itemsPerPage:this.props.itemsPerPage || 6
    }
    _fetchInfoForRepository(repository) {

    }
    componentDidMount() {
        // initialize repository data
        this.setState({loading:true});
        superagent
        .post(this.props.apiUrl)
        .set('authorization', `Bearer ${this.props.accessToken}`)
        .set('content-type','application/json')
        .set('accept',"application/json")
        .send(`{"query": "query { user(login:${this.props.login}){ repositories(first:${this.state.itemsPerPage}after:${JSON.stringify('"1"')},privacy:PUBLIC) { totalCount, edges{cursor, node { name, description, url } } } } }"}`)
        .then(
        response => {
            if(((response.body.data || {}).user || {}).repositories) {
                this.setState({repositories :response.body.data.user.repositories, loading:false})
            }
            else  {
                this.setState({loading:false, error:true})
            }
            if (!response.body.errors) {
                return response.body.data.user.repositories.edges;
            }
            else {
                Array.from(response.body.errors).forEach(({message})=>console.error(message))
                return response.body.errors;
            } 
            
            
            
            
            
            },
        error =>console.error(error)
        )

            
    }
    render () {
    let projects = [];
    if (this.state.loading){
        return <h2>Loading Projects... Please wait</h2>
    }
    else if (this.state.repositories) {
        projects = this.state.repositories.edges.map(
            (repository) =>{
                return <ProjectCard 
                        name={repository.node.name}
                        login={this.props.login}
                        sourceUrl={repository.node.url} key={repository.node.name}
                        description={repository.node.description}
                        accessToken={this.props.accessToken}
                />
            }
        ) || []
    }
    if(this.state.error) {
        return (
        // Create something to show that there are no repositories to show yet
        <Card id='Projects'>
        <p>An error occured. please contact me below </p>
        </Card>
        )
    }
    else {
        if (projects.length === 0) {
        return (
            // Create something to show that there are no repositories to show yet
            <Card id='Projects'>
            <p>No projects to show yet</p>
            </Card>
        )}
        else {
            return (<Card id="Projects">
                {/* <h2 id="header">My Projects</h2> */}
                <div id="projects-grid">
                    {/* <CodePenEmbedded hash={"qvQqwb"} user={"jtmorrisbytes"} /> */}
                    {/* I am placing a few default project cards here until layout is finalized*/}
                    { projects }
    
                </div>
        </Card>)
        }
    }

    }
    
}



export default Projects