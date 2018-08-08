// jshint asi:true

const router = require('express').Router()

router.get('/', (req, res) => {
  console.log(req.query)
  res.redirect('/')
})

router.get('/:id', (req, res) => {
  console.log(req.params)
  res.redirect('/')
})

module.exports = router