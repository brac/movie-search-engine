// jshint asi:true

const client = require('./client')

const findUser = (user) => {
  return new Promise(( resolve, reject) => {
    client.query(
      `
        Select
          *
        FROM
          users
        WHERE
          ${search.type} = $1
      `, [search.value]
    ).then( res => { resolve(res) })
    .catch(e => { reject(e) })
  })
}

module.exports = { findUser }