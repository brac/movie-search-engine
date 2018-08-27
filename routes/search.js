// jshint asi:true
const router    = require('express').Router()
const queryImdb = require('../helpers/queryImdb')

router.get('/', (req, res) => {
// WTF is this even doing?

  // if (!req.session.name) {
  //   return res.redirect('/')
  // }

  // console.log(req.session.name)

  // res.render('login', {message: null})

  // const searchParam = req.query.searchInput

  // queryImdb(searchParam)
  //   .then(results => {
  //     results.forEach(result => {
  //     })
  //     res.render('layout', {results: results})
  //   })
  //   .catch(e => {
  //     res.send(e)
  //   })
})

module.exports = router