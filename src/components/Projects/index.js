import React from "react"
import Card from "../Card"
import "./Projects.css"
import ProjectCard from "../ProjectCard"
// import axios from "axios"
import superagent from "superagent"









// const Projects = (props) => {
//     // TODO: Add data source for all projects
//     window.projectContext = this;
//     const githubAccessToken = "bfc90dc0860aca9063a8670dfb4bbcb68bb73dfd"
//     const numProjectsPerPage = 6;
//     let currentPage = 1
//     let repositories = null;
//     const apiUrl = "https://api.github.com/graphql"
//     const githubLogin = "jtmorrisbytes"
//     let githubApiAvailable =false;
//     let authenticationSucceded = false;
//     let loadingRepositories = false;
//     let schema = null;

//     // const githubApiHttp = new HttpLink({uri:apiUrl})
//     // console.log("HTTPLINK", githubApiHttp)
//     // const link = setContext((request, previousContext) => ({
//     //     headers: {
//     //       'Authorization': `Bearer ${githubAccessToken}`,
//     //     }
//     //   })).concat(githubApiHttp);
   





class Projects extends React.Component {

    state = {
        repositories:null,
        loading:null,
        error:null,
        itemsPerPage:this.props.itemsPerPage || 4,
        previousCursor:null,
        cursor:null,
        nextCursor:null
    }
    _fetchInfoForRepository(repository) {

    }
    _nextPage() {
        if (this.state.hasNextPage && this.state.endCursor) {
            this.setState({...this.state, cursor:this.state.endCursor})
            this._fetchRepositories()
        }
        else {
            console.log("There is no next page")
            return false
        }

    }
    _previousPage() {
        if (this.state.hasPage && this.state.startCursor) {
            this.setState({...this.state, cursor:this.state.startCursor})
            this._fetchRepositories()
        }
        else {
            console.log("There is no previous page")
        }
    }
    _fetchRepositories(cursor = "") {
        this.setState({loading:true});
        let query = '{"query": "query { user(login: $login ){ repositories(first:$itemsPerPage, $cursor privacy:PUBLIC) { pageInfo{ startCursor,endCursor,hasNextPage,hasPreviousPage}, totalCount, edges{ node { name, description, url } } } } }"}';
        query = query.replace("$login", this.props.login || "jtmorrisbytes")
        query = query.replace("$itemsPerPage", String(this.state.itemsPerPage))
        if ( this.state.cursor ) {
            query = query.replace("$cursor", ('after:\\"'+this.state.cursor + '\\",'))
        }
        else  {
            query = query.replace("$cursor", "")
        }
        console.log("QUERY STRING", query)



        
        return superagent
        .post(this.props.apiUrl)
        .set('authorization', `Bearer ${this.props.accessToken}`)
        .set('content-type','application/json')
        .set('accept',"application/json")
        .send(query)
        .then(
        response => {
            console.log("data: ", response.body )
            if(response.body.data) {
                this.setState({repositories :response.body.data.user.repositories,
                    hasNextPage:response.body.data.user.repositories.pageInfo.hasNextPage,
                    hasPreviousPage:response.body.data.user.repositories.pageInfo.hasPreviousPage,
                    startCursor: response.body.data.user.repositories.pageInfo.startCursor,
                    endCursor: response.body.data.user.repositories.pageInfo.endCursor,
                    
                    loading:false})
                return true;
            }
            else  {
                console.error("the project data was unavailable")
                this.setState({loading:false, error:true})
            }
            if (!response.body.data.errors) {
                return response.body.data.user.repositories.edges;
            }
            else return response.body.data
            
            
            },
        error =>console.error(error)
        )
    }
    componentDidMount() {
        window.Projects = this;
        // initialize repository data
        this._fetchRepositories()
        

            
    }
    render () {
    let projects = [];
    if (this.state.loading){
        return <h2>Loading Projects... Please wait</h2>
    }
    else if (this.state.repositories) {
        projects = this.state.repositories.edges.map(
            (repository) =>{
                console.log("REPOSITORY",repository)
                return <ProjectCard 
                        name={repository.node.name}
                        login={this.props.login}
                        sourceUrl={repository.node.url} key={repository.node.name}
                        description={repository.node.description}
                        token={this.props.accessToken}
                />
            }
        ) 
    }
    console.log(projects)
    return (<Card id="Projects">
            <h2 id="header">My Projects</h2>
            <div id='pagination-controls'>
                <button type="button"> previous</button>
                {/* generate page numbers */}
                <button type="button"> next</button>
            </div>
            <div id="projects-grid">
                {/* <CodePenEmbedded hash={"qvQqwb"} user={"jtmorrisbytes"} /> */}
                {/* I am placing a few default project cards here until layout is finalized*/}
                { projects }

            </div>
    </Card>)
    }
}



export default Projects