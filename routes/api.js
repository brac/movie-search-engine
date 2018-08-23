// jshint asi:true
const router    = require('express').Router()
const queryImdb = require('../helpers/queryImdb')

router.get('/movies', (req, res) => {
  queryImdb('The Matrix')
    .then(results => {
      res.json(results)
    })
})

module.exports = router