// jshint asi:true
const rp        = require('request-promise')


const queryImdb = (searchParam) => {
  return new Promise((resolve, reject) => {
    let options = {
      uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${searchParam}&s=all`
    }

    rp(options)
      .then( res => {

        resolve(res)
      })
    .catch(e => reject(e) )
  })
}

module.exports = queryImdb