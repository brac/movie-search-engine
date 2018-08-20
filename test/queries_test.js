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
    it('Saves a new search term and search entry to the database', function() {
      return saveSearch({searchTerm: 'A New Test Movie!', user: 'Ben Bracamonte'})
        .then(() => {
          return findSearchTerm('A New Test Movie!')
            .then(records => {
              expect(records.id).to.equal(12)
            })
      })
        .then(() =>{
          return findHistory('Ben Bracamonte')
          .then(records => {
            expect(records[3].search_term).to.equal('A New Test Movie!')
            expect(records.length).to.equal(4)
          })
        })
      .catch( e => { throw e })
    })

    it('Saves a new search entry for an existing search term to the database', function() {
      return saveSearch({searchTerm: 'The Joy Luck Club', user: 'Jenna Wieden'})
        .then(() => {
          return findSearchTerm('The Joy Luck Club')
            .then(records => {
              expect(records.id).to.equal(2)
            })
        })
        .then(() =>{
          return findHistory('Jenna Wieden')
          .then(records => {
            expect(records[2].search_term).to.equal('The Joy Luck Club')
            expect(records.length).to.equal(3)
          })
        })
      .catch( e => { throw e })
    })
  })
})
