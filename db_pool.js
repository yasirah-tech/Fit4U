const Pool = require("pg").Pool; 

const connectionDevelopment = {
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432, 
    database: "fit4u"
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? connectionProduction : connectionDevelopment)
const connectionProduction = {
    connectionString: process.env.DATABASE_URL, 
    ssl: {rejectUnauthorized: false}
  }

module.exports = pool;