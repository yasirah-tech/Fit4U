const knex = require('knex');
const knexfile = require('../knexfile');
const env = process.env.DB_ENV || 'development';
const db = knex(knexfile[env]);

// db rn is an object that contains metadata
// depending on whether you're currently on development or production 
module.exports = db;