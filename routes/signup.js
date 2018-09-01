// jshint asi:true
const path          = require('path')
const router        = require('express').Router()
const bcrypt        = require('bcryptjs')
const { findUser,
        createUser} = require(path.join(__dirname, '../database/queries'))

router.get('/', (req, res) => {
  if (req.session.name) {
    return res.redirect('/')
  }

  res.render('signup', {message: null})
})

router.post('/', (req, res, next) => {
  const user = {
    name: req.body.name,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  }

  if (user.name === '' || user.password === '' || user.confirmPassword === '') {
    return res.render('signup', {message: 'Please fill out all the fields'})
  }

  if (user.password != user.confirmPassword) {
    return res.render('signup', { message: 'Your password did not match' })
  }

  return findUser(user.name)
    .then(result => {
      if (result.received != 0) {
        return res.status(400).render('signup', { message: 'Username taken' })
      } else {

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) =>{
          user.password = hash
          createUser(user)
          .then(() => {
            user.password = ''
            req.session = { name: user.name }
            return res.redirect('/')
          })
          .catch(next)
        })
      })
      }
    })
})

module.exports = router