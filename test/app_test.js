// jshint asi:true
const chai                = require('chai')
const chaiHTTP            = require('chai-http')
const expect              = chai.expect
const app                 = require('../app.js')
const cheerio             = require('cheerio')
const { resetDatabase}    = require('./helpers.js')
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

    it('responds with the homepage if the user has a valid session cookie', function() {
      return agent
        .post('/login')
          .type('form')
          .send({
            '_method' : 'post',
            'name'    : 'Homer Newark',
            'password': 'password',
          })
        .then( res => {
          expect(res).to.have.status(200)
          expect(res).to.have.cookie('sessionCookie')

          return agent.get('/')
            .then(res => {
              expect(res.status).to.equal(200)
              expect(res).to.have.cookie('sessionCookie')
            })
          .catch(e => { throw e })
        })
      agent.close()
    })

    it(`displays the users name on the header if a valid sessionCookie is provided`, function() {
      return agent
        .post('/login')
          .type('form')
          .send({
            '_method': 'post',
            'name'   : 'Ben Bracamonte',
            'password' : 'password',
          })
        .then( res => {
          const $ = cheerio.load(res.text)
          const userName = $('#name').text().trim()

          expect(res).to.have.status(200)
          expect(res).to.have.cookie('sessionCookie')
          expect(userName).to.equal('Ben Bracamonte')
        })
      .catch(e => { throw e })
      agent.close()
    })

    it('returns the correct number of results for a given search', function() {
      return agent
        .post('/login')
          .type('form')
          .send({
            '_method': 'post',
            'name'   : 'Jenna Wieden',
            'password' : 'password',
          })
        .then(res => {
          return agent.get('/api/movies/The Matrix')
          .then(res => {
            const movies = JSON.parse(res.text)

            expect(res.status).to.equal(200)
            expect(movies.length).to.equal(2)
            expect(movies[0].name.trim()).to.equal('The Matrix')
          })
        .catch(e => { throw e })
        })
      agent.close()
    })

    it('saves a search entry to the users_searches table when a user is logged in', function(){
      return agent
        .post('/login')
          .type('form')
          .send({
            '_method': 'post',
            'name'   : 'Ben Bracamonte',
            'password' : 'password',
          })
      .then(() => {
        return agent.get('/api/movies/The Joy Luck Club')
          .then(() => {
            return findHistory('Jenna Wieden')
              .then( res => {
                expect(res.length).to.equal(3)
                expect(res[2]).to.equal('the joy luck club')
              })
            .catch(e => { throw e })
          })
        })
        agent.close()
    })

    it(`saves a search term to the searches table if it does not exist already
         as well as a new search entry to users_searches `, function() {
      return agent
        .post('/login')
          .type('form')
          .send({
            '_method': 'post',
            'name'   : 'Ben Bracamonte',
            'password' : 'password',
          })
      .then(() => {
        return agent
          .get('/api/movies/A New Test Movie')
          .then(() => {
            return findSearchTerm('a new test movie')
              .then(res => {
                expect(res.search_term).to.equal('a new test movie')

                return findHistory('Ben Bracamonte')
                  .then(res => {
                    expect(res.length).to.equal(4)
                    expect(res[3]).to.equal('a new test movie')
                  })
              })
          })
        .catch(e => { throw e })
      })
      agent.close()
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
        the homepage without sessionCookie`, function() {
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

    it('responds with an error if the user name is taken', function() {
      return chai.request(app)
        .post('/signup')
        .type('form')
        .send({
          '_method': 'post',
          'users_name': 'Ben Bracamonte',
          'password': 'farts',
        })
        .then(res => {
          expect(res).to.have.status(400)
        })
      .catch(e => { throw e })
    })

    it('creates a new user with a valid user name', function() {
      return agent
        .post('/signup')
        .type('form')
        .send({
          '_method': 'post',
          'users_name': 'Lenny Dogface',
          'password': 'bones',
        })
        .then(postReply => {
          return findUser('Lenny Dogface')
            .then(res => {
              expect(postReply).to.redirect //jshint ignore:line
              expect(res.users_name).to.equal('Lenny Dogface')
              expect(res).to.have.cookie('sessionCookie')
            })
        })
      .catch(e => { throw e })
      agent.close()
    })

  })

  context('History', function() {
    it('responds with the history of the current user', function() {
      return agent
        .post('/login')
          .type('form')
          .send({
            '_method': 'post',
            'name'   : 'Ben Bracamonte',
            'password' : 'password',
          })
      .then( () => {
        return agent.get('/api/history/Ben Bracamonte')
        .then( res => {
          expect(res[0].name).to.equal('The Matrix')
          expect(res.length).to.equal(3)
        })
        .catch( e => { throw e })
      })
      agent.close()
    })
  })

  context('Logout', function() {
    it('logs the current user out', function() {
      return agent
        .post('/login')
          .type('form')
          .send({
            '_method': 'post',
            'name'   : 'Jenna Weiden',
            'password' : 'password',
          })
      .then(res => {
        return agent.get('/logout')
        .then(res => {
          const $ = cheerio.load(res.text)
          const login = $('#login').text().trim()

          expect(login).to.equal('login')
          expect(res).to.redirect
        })
        .catch( e => { throw e })
      })
      agent.close()
    })
  })
})
