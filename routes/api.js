// jshint asi:true
const router          = require('express').Router()
const queryImdb       = require('../helpers/queryImdb')
const { findHistory,
        saveSearch,  } = require('../database/queries')

router.get('/movies/:searchTerm', (req, res) => {
  if (!req.session.name) {
    return res.redirect('/login')
  }
  searchTerm = req.params.searchTerm
  user       = req.session.name

  saveSearch({searchTerm, user})
    .then(() => {
      queryImdb(searchTerm)
        .then(results => {
          res.json(results)
        })
    })
  .catch(e => { throw e })
})

router.get('/history', (req, res) => {
  if (!req.session.name) {
    return res.redirect('/login')
  }

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