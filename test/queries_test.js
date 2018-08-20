// jshint asi:true

const chai              = require('chai')
const expect            = chai.expect
const { resetDatabase } = require('./helpers.js')
const { findHistory,
        findUser,
        createUser,
        saveSearch,
        findAll }    = require('../database/queries')

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
          findHistory('Jenna Wieden')
          .then(records => {
            expect(records[1].search_term).to.equal('Jurassic Park')
            expect(records.length).to.equal(2)
          })
        })
      .catch(e => { throw e })
    })
  })

  context('findUser', function() {
    it('Returns the user id and name', function() {
      return findUser('Jenna Wieden')
        .then(records => {
          expect(records.id).to.equal(2)
          expect(records.users_name).to.equal('Jenna Wieden')
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
          expect(records.id).to.equal(101)
        })
      .catch(e => { throw e })
    })
  })

  context('saveSearch', function() {
    xit('Saves the search term to the database', function() {
    })
  })
})
