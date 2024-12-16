const initOptions = {capSQL : true}

const pgp = require('pg-promise')(initOptions)

// import pgpInit from 'pg-promise';

const cn = {
    host: process.env.DBHOST || "localhost",
    port: process.env.DBPORT || 5433,
    database: process.env.DBNAME || 'progres',
    user: process.env.DBUSER || 'progres',
    password: process.env.DBPASSWORD || "rootUser",
}

const db = pgp(cn);

const users = []

module.exports = (schema) => {
    return {
        
    }
}
