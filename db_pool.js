const Pool = require("pg").Pool; 

const pool = new Pool({
    user: "postgres",
    password: "emir",
    host: "localhost",
    port: 5432, 
    database: "fit4u"
})

module.exports = pool;