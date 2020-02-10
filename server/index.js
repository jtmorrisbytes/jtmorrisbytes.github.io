require("dotenv").config()
const express = require('express')
const path = require('path')
const JSDOM = require('jsdom').JSDOM
const fs = require('fs')
const server = express()

const PORT = Number(process.env.PORT) || 3000
let HOST;
if(process.env.NODE_ENV === 'production'){
    HOST = process.env.HOST || "0.0.0.0"
}
else {
    HOST = process.env.HOST || "localhost"
}


const ROOT = path.join(__dirname, "..")
const HTML_ROOT = path.join(ROOT,'build')

let AppDocument = String(fs.readFileSync(path.join(HTML_ROOT,'index.html')))
if(process.env.GITHUB_AUTH_TOKEN){
    AppDocument = AppDocument.replace('id="root">',`id="root" data-github-token="${process.env.GITHUB_AUTH_TOKEN}">`)

}
server.get("/", (req,res)=>{
    // console.log("is user authenticated",req.isAuthenticated() || "NO")
    res.send(AppDocument);
})
server.get("/error",(req,res)=>{res.sendStatus(500)})
server.use(express.static(HTML_ROOT));
server.listen(PORT,HOST,()=>{console.log(`listenting on ${HOST}:${PORT}`)})