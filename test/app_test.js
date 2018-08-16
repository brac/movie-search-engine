// jshint asi:true
const chai     = require('chai')
const chaiHTTP = require('chai-http')
const expect   = chai.expect
const app  = require('../app.js')

chai.use(chaiHTTP)

describe('Movie Search Engine', () => {
  beforeEach(resetDatabase)

  context('Homepage', () => {
    it('responds with the homepage', () => {
      return chai.request(app)
        .get('/')
        .then((res) => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(200)
        })
        .catch(e => { throw e })
    })
  })

  context('Login', () => {
    it('responds with the login page', () => {
      return chai.request(app)
        .get('/login')
        .then((res) => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(200)
        })
        .catch(e => { throw e })
    })

    it('redirects with a successful authentication', () => {
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

    it('reloads the same page on failed authentication', () => {
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

  context('Signup', () => {
    it('responds with the signup page', () => {
      return chai.request(app)
        .get('/signup')
        .then((res) => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(200)
        })
        .catch(e => { throw e })
    })
  })

  context('History', () => {
    it('responds with the history page', () => {
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


function resetDatabase(){
  // return (console.log('resetDatabase()...'))
}

