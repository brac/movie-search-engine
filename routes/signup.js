// jshint asi:true

const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('signup', {message: null})
})

router.post('/', (req, res) => {
  res.end(`Got some data: ${req.body.name}, ${req.body.password}, ${req.body.confirmPassword}`)
})

module.exports = router