const express = require('express')
const path = require('path')

const server = express()

const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || "localhost"

server.use(express.static(path.join(__dirname, 'build')));




server.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})








server.listen(PORT,HOST,()=>{console.log(`listenting on ${HOST}:${PORT}`)})