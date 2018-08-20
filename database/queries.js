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
    e => { throw e }
  )
}

const findUser = (user) => {
  return client.one(`
    SELECT id, users_name
    FROM users
    WHERE users.users_name = $1;`, [user]
  ).then(
    results => results,
    e => { throw e }
  )
}

const createUser = ({name, password}) => {
  return client.oneOrNone(`
    INSERT INTO users (users_name, password)
    VALUES ($(name), $(password));`, {name, password})
  .then(
    results => results,
    e => { throw e }
  )
}

const findSearchTerm = (searchTerm) => {
  return client.oneOrNone(`
    SELECT *
    FROM searches
    WHERE searches.search_term = $1;`, [ searchTerm ])
  .then(
    results => results,
    e => { throw e }
  )
}

const saveSearch = ({searchTerm, user}) => {
  return findUser(user)
    .then(results => {
      let userId = results.id

      findSearchTerm(searchTerm)
        .then(results => {
          if (results === null) {
            client.one(`
              INSERT INTO searches (search_term)
              VALUES ($1)
              RETURNING id;`, [ searchTerm ])
            .then((res) => {
              let searchId = res.id
              console.log(searchId)
            })
          } else {
            console.log('Old book!')
          }



        })

      // findSearchTerm(searchTerm)
      //   .then(results => {
      //     // Search term is in database, only save to users_searches
      //     if (Object.keys(results).length > 1) {
      //       const searchId = results.id
      //       client.oneOrNone(`
      //         INSERT INTO users_searches (users_id, searches_id)
      //         VALUES ($1, $2)
      //       `, [ userId, searchId ])

      //     } else {
      //       console.log('a thing')
      //       return 'farts'
      //     }
      //   })
    })
  .catch(e => { throw e })
}


const saveUsersSearches = ({searchTerm, user}) => {

}

module.exports = {
  findHistory,
  findUser,
  createUser,
  saveSearch,
  findSearchTerm,
}