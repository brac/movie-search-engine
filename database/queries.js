// jshint asi:true
const client = require('./client')

const findHistory = (user) => {
  return client.many(`
      SELECT search_term
      FROM searches
      JOIN users_searches ON (searches.id = users_searches.searches_id)
      JOIN users ON (users_searches.users_id = users.id)
      WHERE users.users_name = $1;`, [user]
  ).then(
    results => results,
    error => error
  )
}

const findUser = (user) => {
  return client.one(`
    SELECT id, users_name
    FROM users
    WHERE users.users_name = $1;`, [user]
  ).then(
    results => results,
    error => error
  )
}

const createUser = ({name, password}) => {
  return client.oneOrNone(`
    INSERT INTO users (users_name, password)
    VALUES ($(name), $(password));`, {name, password})
  .then(
    results => results,
    error => error
  )
}

const saveSearch = (searchTerm) => {

}

module.exports = {
  findHistory,
  findUser,
  createUser,
  saveSearch,
}