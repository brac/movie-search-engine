// jshint asi:true

const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', (req, res) => {
  res.end(`Got some data: ${req.body.name}, ${req.body.password}`)
})

module.exports = router