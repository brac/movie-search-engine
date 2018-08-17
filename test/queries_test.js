// jshint asi:true

const chai              = require('chai')
const expect            = chai.expect
const { resetDatabase } = require('./helpers.js')
const { findHistory,
        findUser,
        createUser,
        saveSearch }    = require('../database/queries')

describe('Database Queries', function() {
  beforeEach(resetDatabase)

  context('findHistory', function() {
    it('Returns the history of a user', function() {
      return findHistory('Ben Bracamonte')
        .then(records => {
          expect(records[0].search_term).to.equal('The Matrix')
          expect(records.length).to.equal(3)
          return findHistory('Jenna Wieden')
        }).then(records => {
          expect(records[1].search_term).to.equal('Jurassic Park')
          expect(records.length).to.equal(2)
        })
    })
  })

  context('findUser', function() {
    it('Returns the user id and name', function() {
      expect(1).to.be.equal(0)
    })
  })

  context('createUser', function() {
    it('Creates a user and adds it to the database', function() {
      expect(1).to.be.equal(0)
    })
  })

  context('saveSearch', function() {
    it('Saves the tearch term to the database', function() {
      expect(1).to.be.equal(0)
    })
  })
})
