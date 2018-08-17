// jshint asi:true
const chai              = require('chai')
const chaiHTTP          = require('chai-http')
const expect            = chai.expect
const app               = require('../app.js')
const { resetDatabase
}                       = require('./helpers.js')

chai.use(chaiHTTP)

describe('Movie Search Engine', function() {
  beforeEach(resetDatabase)

  context('Homepage', function() {
    it('responds with the homepage', function() {
      return chai.request(app)
        .get('/')
        .then((res) => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(200)
        })
        .catch(e => { throw e })
    })
  })

  context('Login', function() {
    it('responds with the login page', function() {
      return chai.request(app)
        .get('/login')
        .then((res) => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(200)
        })
        .catch(e => { throw e })
    })

    it('redirects with a successful authentication', function() {
      return chai.request(app)
        .post('/login')
        .type('form')
        .send({
          '_method' : 'post',
          'name'    : 'brac',
          'password': 'lenny'
        })
        .then( res => {
          expect(res).to.redirect //jshint ignore:line
        })
    })

    it('reloads the same page on failed authentication', function() {
      return chai.request(app)
        .post('/login')
        .type('form')
        .send({
          '_method' : 'post',
          'name'    : 'brac',
          'password': 'farts'
        })
        .then( res => {
          expect(res).to.have.status(401) //jshint ignore:line
      })
    })
  })

  context('Signup', function() {
    it('responds with the signup page', function() {
      return chai.request(app)
        .get('/signup')
        .then((res) => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(200)
        })
        .catch(e => { throw e })
    })
  })

  context('History', function() {
    it('responds with the history page', function() {
      return chai.request(app)
        .get('/')
        .then((res) => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(200)
        })
        .catch(e => { throw e })
    })
  })
})
