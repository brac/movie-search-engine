// jshint asi:true

const router        = require('express').Router()
const bcrypt        = require('bcryptjs')
const { findUser,
        createUser} = require('../database/queries')

router.get('/', (req, res) => {
  if (req.session.name) {
    return res.redirect('/')
  }

  res.render('signup', {message: null})
})

router.post('/', (req, res) => {
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
        res.send('found an existing user')
      } else {
        res.send('new user!')
      }
    })

  // bcrypt.getSalt(10, (err, sals) => {
    // bcrypt.hash(user.password, salt, (err, hash) =>{
      // user.password = hash
    // })
  // })
//
  // res.json(user)



  // findUser(req.body.name)
  //   .then( user => {

  //     if (user.received == 0) {
  //       return res.status(401).render('login', {message: 'Invalid Username or Password'})
  //     } else {

  //       bcrypt.compare(req.body.password, user.password, (err, result) => {
  //         if (err) { return res.status(500).render('login', { message: err }) }

  //         if (result) {
  //           user.password = ''
  //           req.session = {name: user.users_name}
  //           return res.redirect('/')
  //         }

  //         if (!result) {
  //           return res.render('login', { message: 'Invalid Username or Password'})
  //         }
  //       })
  //     }
  //   })
  // .catch(e => {
  //   return res.status(500).render('login', {message: e})
  // })
})

module.exports = router