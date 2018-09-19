const path   = require('path')
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const { findUser,
        createUser } = require(path.join(__dirname, '../database/queries'))

router.get('/', (req, res) => {
  if (req.session.name) {
    return res.redirect('/')
  }

  res.render('login', {message: null})
})

router.post('/', (req, res, next) => {
  findUser(req.body.name)
    .then( user => {

      if (user.received == 0) {
        return res.status(401).render('login', {message: 'Invalid Username or Password'})
      } else {

        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) { return res.status(500).render('login', { message: err }) }

          if (result) {
            user.password = ''
            req.session = {name: user.users_name}
            return res.redirect('/')
          }

          if (!result) {
            return res.render('login', { message: 'Invalid Username or Password'})
          }
        })
      }
    })
  .catch(next)
})

module.exports = router