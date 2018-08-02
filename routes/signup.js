// jshint asi:true

const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('signup')
})

router.post('/', (req, res) => {
  console.log('POST to Signup!')
  res.render('layout')
})

module.exports = router