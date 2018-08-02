// jshint asi:true

const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', (req, res) => {
  console.log('POST to Login!')
  res.render('layout')
})

module.exports = router