// jshint asi:true
const router    = require('express').Router()
const queryImdb = require('../helpers/queryImdb')

router.get('/movies/:searchTerm', (req, res) => {
  queryImdb(req.params.searchTerm)
    .then(results => {
      res.json(results)
    })
})

module.exports = router