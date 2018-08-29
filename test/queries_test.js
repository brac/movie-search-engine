// jshint asi:true

const chai                = require('chai')
const expect              = chai.expect
const { resetDatabase }   = require('./helpers.js')
const { findHistory,
        findUser,
        createUser,
        saveSearch,
        findAll,
        findSearchTerm, } = require('../database/queries')

describe('Database Queries', function() {
  beforeEach(resetDatabase)

  context('findHistory', function() {
    it('Returns the history of a user', function() {
      return findHistory('Ben Bracamonte')
        .then(records => {
          expect(records[0].search_term).to.equal('The Matrix')
          expect(records.length).to.equal(3)
        })
        .then(() =>{
          return findHistory('Jenna Wieden')
          .then(records => {
            expect(records[1].search_term).to.equal('Jurassic Park')
            expect(records.length).to.equal(2)
          })
        })
      .catch(e => { throw e })
    })
  })

  context('findUser', function() {
    it('Returns the user name', function() {
      return findUser('Jenna Wieden')
        .then(records => {
          expect(records.users_name).to.equal('Jenna Wieden')
        })
      .catch(e => { throw e })
    })

    it('Returns the user name of a different user', function() {
      return findUser('Ben Bracamonte')
        .then(records => {
          expect(records.users_name).to.equal('Ben Bracamonte')
        })
      .catch(e => { throw e })
    })
  })

  context('createUser', function() {
    it('Creates a user and adds it to the database', function() {
      return createUser({
        name: 'Lenny Dogface',
        password: 'password',
      })
        .then(() => {
          return findUser('Lenny Dogface')})
        .then(records => {
          expect(records.users_name).to.equal('Lenny Dogface')
        })
      .catch(e => { throw e })
    })
  })

  context('saveSearch', function() {
    it('Saves a new search entry for an existing search term to the database', function() {
      return saveSearch({searchTerm: 'The Joy Luck Club', user: 'Jenna Wieden'})
        .then(() =>{
          return findHistory('Jenna Wieden')
          .then(records => {
            expect(records.length).to.equal(3)
            expect(records[2].search_term).to.equal('The Joy Luck Club')
          })
        })
      .catch( e => { throw e })
    })

    it('Saves a new search term and search entry to the database', function() {
      return saveSearch({searchTerm: 'A new test movie!', user: 'Ben Bracamonte'})
        .then(() => {
          return findHistory('Ben Bracamonte')
          .then(records => {
            expect(records.length).to.equal(4)
            expect(records[3].search_term).to.equal('A new test movie!')
          })
        })
      .catch( e => { throw e })
    })
  })
})
