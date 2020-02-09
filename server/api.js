const api = require('express').Router()
global.fetch = require('fetch')
api.MOUNT_PATH = process.env.API_MOUNT_PATH || "/api"
// ensure that the github token was specified before starting the server
if(!process.env.GITHUB_AUTH_TOKEN) {
    throw new Error("the github auth token is required")
}
const client = new (require('apollo-boost').ApolloClient)({
    link: new (require('apollo-link-http').HttpLink)({
        uri: 'https://api.github.com/graphql',
        headers:{
            authorization: `bearer ${process.env.GITHUB_AUTH_TOKEN}`
        }
    }),
    
    cache:new (require('apollo-cache-inmemory').InMemoryCache)()
});
// api.get("/projects/")

module.exports = api