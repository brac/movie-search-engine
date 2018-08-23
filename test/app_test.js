// jshint asi:true
const chai              = require('chai')
const chaiHTTP          = require('chai-http')
const expect            = chai.expect
const app               = require('../app.js')
const { resetDatabase
}                       = require('./helpers.js')
const { findHistory,
        findUser,
        findAll,
        findSearchTerm, } = require('../database/queries')

chai.use(chaiHTTP)
const agent               = chai.request.agent(app)

describe('Movie Search Engine', function() {
  beforeEach(resetDatabase)

  context('Homepage', function() {
    it('redirects to the login page if the user has not logged in', function(){
      return chai.request(app)
      .get('/')
      .then(res => {
        expect(res).to.redirect //jshint ignore:line
      })
      .catch( e => { throw e })
    })

    it('responds with the homepage if the user has logged in', function() {
      return chai.request(app)
        .get('/')
        .set('sessionCookie', 'name="Ben Bracamonte"')
        .then(res => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(200)
        })
      .catch(e => { throw e })
    })

    // TODO: Use some HTML parser to determine if the header name is correct
    // xit('continues a users session if they have a valid sessionCookie', function() {
    //   return chai.request(app)
    //     .get('/')
    //     .set('sessionCookie', 'id=1;name="test testerson"')
    //     .then(res => {
    //       expect(res.text).to.have(`<a class="nav-link text-white" href="#">Ben Bracamonte</a>`)
    //       expect(res).to.have.status(200)
    //       expect(res).to.have.cookie('sessionCookie')
    //     })
    //   .catch(e => { throw e })
    // })

    xit('returns the correct number of results for a given search', function() {
      return chai.request(app)
        .get('/search?searchInput=The+Matrix')
        .then(res => {
          expect(res.text).to.have('The right results')
        })
      .catch(e => { throw e })
    })

    xit('saves a search entry to the users_searches table when a user is logged in', function(){
      return chai.request(app)
        .get('/search?searchInput=the+joy+luck+club')
        .set('sessionCookie', 'id=2;name="Jenna Wieden"')
        .then(() => {
          findHistory('Jenna Wieden')
            .then( res => {
              expect(res.length).to.equal(3)
              expect(res[2]).to.equal('the joy luck club')
            })
        })
      .catch(e => { throw e })
    })

    xit('saves a search term to the searches table if it does not exist already', function() {
      return chai.request(app)
        .get('/search?searchInput=a+new+test+movie')
        .then(() => {
          findSearchTerm('a new test movie')
            .then(res => {
              expect(res.id).to.equal(22)
              expect(res.search_term).to.equal('a new test movie')
            })
        })
      .catch(e => { throw e })
    })

    xit('saves a search term and search entry to their respective tables when a user is logged in', function() {
      return chai.request(app)
        .get('/search?searchInput=a+new+dog+movie')
        .set('sessionCookie', 'id=1;name="Ben Bracamonte"')
        .then(() => {
          findSearchTerm('a new dog movie')
            .then(res => {
              expect(res.id).to.equal(22)
              expect(res.search_term).to.equal('a new dog movie')
              findHistory('Ben Bracamonte')
                .then(res => {
                  expect(res.length).to.equal(3)
                  expect(res[2]).to.equal(' a new dog movie')
                })
            })
        })
      .catch(e => { throw e })
    })
  })

  context('Login', function() {
    it('responds with the login page', function() {
      return chai.request(app)
        .get('/login')
        .then(res => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(200)
        })
        .catch(e => { throw e })
    })

    it(`redirects to the main page with a successful authentication
        and stores a session cookie`, function() {
      return chai.request(app)
        .post('/login')
        .type('form')
        .send({
          '_method' : 'post',
          'name'    : 'Ben Bracamonte',
          'password': 'password'
        })
        .then( res => {
          expect(res).to.redirect //jshint ignore:line
          expect(res).to.have.cookie('sessionCookie')
        })
      .catch(e => { throw e })
    })

    it(`redirects to the main page if the user has logged
        in and has a session cookie`, function() {
    return agent
      .post('/login')
        .type('form')
        .send({
          '_method' : 'post',
          'name'    : 'Jenna Wieden',
          'password': 'password',
        })
      .then( res => {
        expect(res).to.have.status(200)
        expect(res).to.have.cookie('sessionCookie')
        return agent.get('/login')
          .then(res => {
            expect(res).to.redirect //jshint ignore:line
          })
        .catch(e => { throw e })
      })
    agent.close()

    })

    it(`user is redirected to the login page when trying to access
        the mainpage without sessionCookie`, function() {
      return chai.request(app)
        .get('/')
        .then(res => {
          expect(res).to.redirect //jshint ignore:line
        })
    })

    it('responds with status 401 on non user', function() {
      return chai.request(app)
        .post('/login')
        .type('form')
        .send({
          '_method' : 'post',
          'name'    : 'brac',
          'password': 'farts',
        })
        .then( res => {
          expect(res).to.have.status(401) //jshint ignore:line
      })
      .catch(e => { throw e })
    })
  })

  context('Signup', function() {
    it('responds with the signup page', function() {
      return chai.request(app)
        .get('/signup')
        .then(res => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(200)
        })
      .catch(e => { throw e })
    })

    xit('responds with an error if the user name is taken', function() {
      return chai.request(app)
        .post('/signup')
        .type('form')
        .send({
          '_method': 'post',
          'users_name': 'Ben Bracamonte',
          'password': 'farts',
        })
        .then(res => {
          expect(res).to.be.html //jshint ignore:line
          expect(res).to.have.status(409)
        })
      .catch(e => { throw e })
    })

    xit('creates a new user with a valid user name', function() {
      return chai.request(app)
        .post('/signup')
        .type('form')
        .send({
          '_method': 'post',
          'users_name': 'Lenny Dogface',
          'password': 'bones',
        })
        .then(postReply => {
          findUser('Lenny Dogface')
            .then(res => {
              expect(postReply).to.redirect //jshint ignore:line
              expect(res.users_name).to.equal('Lenny Dogface')
              expect(res.id).to.equal('101')
            })
        })
      .catch(e => { throw e })
    })

  })

  context('History', function() {
    xit('responds with the history of the current user', function() {
      // GET on history
      // Check elements of returned html
    })
  })

  context('Logout', function() {
    xit('logs the current user out', function() {
      // POST to logout with sessionCookie
      // Check returned sessionCookie
    })
  })
})
