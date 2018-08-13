// jshint asi:true
const router    = require('express').Router()
const queryImdb = require('../helpers/queryImdb')

router.get('/', (req, res) => {
  const searchParam = req.query.searchInput

  queryImdb(searchParam)
    .then(results => {
      res.render('layout', {results: results})
    })
    .catch(e => {
      res.send(e)
    })
})

module.exports = router