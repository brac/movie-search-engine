// jshint asi:true

const router = require('express').Router()
const { findUser,
        createUser } = require('../database/queries')

router.get('/', (req, res) => {
  if (req.session.name) {
    return res.redirect('/')
  }
  res.render('login', {message: null})
})

router.post('/', (req, res) => {
  // Dont have to check for name or password
  // bootstrap's popper alerts those missing
  // ...I think

  findUser(req.body.name)
    .then( user => {
      if (user.received == 0) {
        return res.render('login', {message: 'Invalid Username or Password'})
      }
      req.session = user

      console.log(req.session)

      res.render('layout', req.session)
    })
  .catch(e => {throw e})
})

module.exports = router