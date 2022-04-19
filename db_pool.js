const Pool = require("pg").Pool; 

const connectionDevelopment = {
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432, 
  database: "fit4u"
}


const connectionProduction = {
  connectionString: process.env.DATABASE_URL, 
  ssl: {rejectUnauthorized: false}
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? connectionProduction : connectionDevelopment)
module.exports = pool;