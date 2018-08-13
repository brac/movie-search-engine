// jshint asi:true
const router    = require('express').Router()
const queryImdb = require('../helpers/queryImdb')

  // const uri = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${searchInput}&s=all`

router.get('/', (req, res) => {

  const searchParam = req.query.searchInput

  queryImdb(searchParam)
    .then(results => {
      console.log(results)
      res.send(results)
    })
    .catch(e => {
      res.send(e)
    })

})

module.exports = router