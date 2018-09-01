// jshint asi:true
const path            = require('path')
const router          = require('express').Router()
const queryImdb       = require(path.join(__dirname,'../helpers/queryImdb'))
const { findHistory,
        saveSearch,  } = require(path.join(__dirname,'../database/queries'))

router.get('/movies/:searchTerm', (req, res, next) => {
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
  .catch(next)
})

router.get('/history', (req, res, next) => {
  if (!req.session.name) {
    return res.redirect('/login')
  }

  let results =[]

  findHistory(req.session.name)
    .then(history => {
      if (history.received === 0) {
        return res.json(results)
      } else {
        history.forEach( item => {
          results.push({
            name: item.search_term,
          })
        })
      }
      return res.json(results)
    })
    .catch(next)
})

module.exports = router