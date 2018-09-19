const path = require('path')
const db   = require(path.join(__dirname, 'client'))

const findHistory = (user) => {
  return db.many(`
      SELECT search_term
      FROM searches
      JOIN users_searches ON (searches.id = users_searches.searches_id)
      JOIN users ON (users_searches.users_id = users.id)
      WHERE users.users_name = $1;`, [user]
  ).then(
    results => results,
    e => e
  )
}

const findUser = (user) => {
  return db.one(`
    SELECT id, users_name, password
    FROM users
    WHERE users.users_name = $1;`, [user]
  ).then(
    results => results,
    e => e
  )
}

const createUser = ({name, password}) => {
  return db.oneOrNone(`
    INSERT INTO users (users_name, password)
    VALUES ($(name), $(password));`, {name, password})
  .then(
    results => results,
    e => e
  )
}

const findSearchTerm = (searchTerm) => {
  return db.oneOrNone(`
    SELECT *
    FROM searches
    WHERE searches.search_term = $1;`, [ searchTerm ])
  .then(
    results => results,
    e => e
  )
}

const saveSearch = ({searchTerm, user}) => {
  // Find the userId
  return findUser(user)
    .then(results => {
      let userId = results.id

      // Look for the search term
      return findSearchTerm(searchTerm)
        .then(results => {
          // If no term was found, save the searchTerm to searches
          // then save search entry to users_searches
          if (results === null) {
            return db.none(`
              DO $$
                DECLARE sid integer;
                BEGIN
                  INSERT INTO
                    searches (search_term)
                  VALUES
                    ($1) RETURNING id INTO sid;

                  INSERT INTO
                    users_searches (users_id, searches_id)
                  VALUES
                    ($2, sid);
                END $$;
            `, [ searchTerm, userId ])

          // A search term record was found, so only save to join table
          } else if (results !== null){
            let searchId = results.id
            return saveUsersSearches(userId, searchId)
          }
        })
    })
  .catch(e => e)
}

const saveUsersSearches = (userId, searchId) => {
  return db.none(`
    INSERT INTO users_searches (users_id, searches_id)
    VALUES ($1, $2)`, [ userId, searchId ])
}

module.exports = {
  findHistory,
  findUser,
  createUser,
  saveSearch,
  findSearchTerm,
}