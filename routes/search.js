// jshint asi:true

const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('layout', {results: {name: 'ben', job: 'programmer'}})
})

// router.get('/:id', (req, res) => {
//   console.log(req.params)
//   res.redirect('/')
// })

module.exports = router