// jshint asi:true

const bcrypt = require('bcryptjs')
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
  findUser(req.body.name)
    .then( user => {
      if (user.received == 0) {
        return res.status(401).render('login', {message: 'Invalid Username or Password'})
      }

      req.session = {name: user.users_name}
      res.redirect('/')
    })
  .catch(e => {
    return res.status(500).render('login', {message: e})
  })
})

module.exports = router