require("dotenv").config()
const {Pool, Client} = require('pg')

const DATABASE_URL = process.env.DATABASE_URL || `postgresql://postgres:94187013@localhost:5432/${process.env.APP_NAME}`
let pool;


pool = new Pool({connectionString:DATABASE_URL})









// process.on('SIGTERM',pool.end)
// process.on('SIGINT',pool.end)
// process.on('exit',pool.end)