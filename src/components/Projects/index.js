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
   




//     const projectMockObject = {
//         name:"",
//         description:"",
//         photoUrl:"",
//         photoAltText:"",
//     }
//     // let projects = []
//     // for(let i=0; i< 10; i++) {
//     //     console.log(i)
//     //     let newMockObject = Object.assign({
//     //         name:"Test Project " + i,
//     //         description:"A test Project number " + i,
//     //         photoAltText: "A test Project photo for project number " + i
//     //     },projectMockObject)
//     //     projects.push(
//     //     <ProjectCard name={projectMockObject.name} key={"test-project-"+i}/>)
//     // }
//     // console.log(projects)
//     let projects = [];
    
//     if (repositories) {
//         projects = repositories.edges.map(
//             (repository) =>{
//                 return <ProjectCard name={repository.name} key={repository.name} />
//             }
//         ) 
//     }
//     console.log(projects)
//     return <Card id="Projects">
//             {/* <h2 id="header">My Projects</h2> */}
//             <div id="projects-grid">
//                 {/* <CodePenEmbedded hash={"qvQqwb"} user={"jtmorrisbytes"} /> */}
//                 {/* I am placing a few default project cards here until layout is finalized*/}
//                 { projects }

//             </div>
//     </Card>
// }

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
        .send(`{"query": "query { user(login:${this.props.login}){ repositories(first:${this.state.itemsPerPage},privacy:PUBLIC) { totalCount, edges{cursor, node { name, description, url } } } } }"}`)
        .then(
        response => {
            console.log("data: ", response.body )
            if(response.body.data) {
                let repositories = 
                {...response.body.data.user.repositories,
                    edges: response.body.data.user.repositories.edges.map(
                            (repository)=>{
                                let foundPackageJson = false;

                                var result =null;
                                superagent.get(`https://raw.githubusercontent.com/${this.props.login}/${repository.node.name}/master/portfolio-info.json?token=${this.props.accessToken}`)
                                .end((response,error) =>{
                                    if(error) {
                                        if (error.statusCode ===404) {
                                            /*
                                                if the file isnt found, assume that the project should not
                                                be shown on the portfolio.
                                            
                                            */
                                            result= false
                                        }
                                        console.log("RECIEVED_ERROR_RESPONSE",error)
                                    }
                                    else if(response) {
                                        console.log("RECIEVED_RESPONSE",response)
                                        if(response.statusCode) {
                                            console.log("RESPONSE_STATUS",response.statusCode)
                                        }
                                        
                                    }
                                })
                                console.log("FETCH_PROJECT_INFO_RESULT",result)
                                
                            }
                        )
                    
                }
                this.setState({repositories :response.body.data.user.repositories, loading:true})
                
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
            {/* <h2 id="header">My Projects</h2> */}
            <div id="projects-grid">
                {/* <CodePenEmbedded hash={"qvQqwb"} user={"jtmorrisbytes"} /> */}
                {/* I am placing a few default project cards here until layout is finalized*/}
                { projects }

            </div>
    </Card>)
    }
}



export default Projects