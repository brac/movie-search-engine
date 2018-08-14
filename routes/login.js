// jshint asi:true

const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', (req, res) => {
  res.send('Post from /login!')
})

module.exports = router