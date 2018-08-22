// jshint asi:true
const pgp = require('pg-promise')()
// const databaseName = process.env.NODE_ENV == 'test' ? 'movie_search_engine_test' : 'movie_search_engine'
const databaseName = 'movie_search_engine_test'

const cn = {
    host: 'localhost',
    port: 5432,
    database: databaseName,
}

let db = pgp(cn);

module.exports = db