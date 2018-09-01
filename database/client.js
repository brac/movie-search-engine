// jshint asi:true
const { Client } = require('pg')
const pgp          = require('pg-promise')()
const databaseName = process.env.NODE_ENV == 'test' ? 'movie_search_engine_test' : 'movie_search_engine'

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})

const localConnection = {
    host: 'localhost',
    port: 5432,
    database:  databaseName,
}

const remoteConnection = {
  user: 'kksfpoqgolzivm',
  password: '835982c2170d4ab25d0ba76505f49dc23629500c09d96c933e04b3d002e7aa82',
  host: 'ec2-54-235-86-226.compute-1.amazonaws.com',
  port: '5432',
  database: 'd4o5pjqsmknffb',
  ssl: true,
}

const cn = process.env.DATABASE_URL ? remoteConnection : localConnection

let db = pgp(cn);

module.exports = db