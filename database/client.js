// jshint asi:true

const pgp = require('pg-promise')()

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'movie_search_engine_users',
}

let db = pgp(cn);

module.exports = db