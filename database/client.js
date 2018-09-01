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

const cn = process.env.DATABASE_URL ? process.env.DATABASE_URL : localConnection

let db = pgp(cn);

if (process.env.DATABASE_URL) {
  client.connect()
  client.query(`SELECT id, users_name, password
    FROM users
    WHERE users.users_name = 'Ben B'`, (err, result) => {

    if (err) { throw err}
    for (let row of result.rows) {
      console.log(JSON.stringify(row))
    }
    client.end()
  })
}

module.exports = db