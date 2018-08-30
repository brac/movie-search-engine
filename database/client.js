// jshint asi:true
const pgp = require('pg-promise')()
const databaseName = process.env.NODE_ENV == 'test' ? 'movie_search_engine_test' : 'movie_search_engine'
const host =  process.env.HEROKU == 'true' ? `postgres://kksfpoqgolzivm:835982c2170d4ab25d0ba76505f49dc23629500c09d96c933e04b3d002e7aa82@ec2-54-235-86-226.compute-1.amazonaws.com:5432/d4o5pjqsmknffb` : 'localhost'

const cn = {
    host: host,
    port: 5432,
    database: databaseName,
}

let db = pgp(cn);

module.exports = db