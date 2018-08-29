// jshint asi:true
const router          = require('express').Router()
const queryImdb       = require('../helpers/queryImdb')
const { findHistory } = require('../database/queries')

router.get('/movies/:searchTerm', (req, res) => {
  queryImdb(req.params.searchTerm)
    .then(results => {
      res.json(results)
    })
})

router.get('/history', (req, res) => {
  let results =[]

  findHistory(req.session.name)
    .then(history => {
      history.forEach( item => {
        results.push({
          name: item.search_term,
        })
      })
      res.json(results)
    })
    .catch(e => { throw e })
})

module.exports = router