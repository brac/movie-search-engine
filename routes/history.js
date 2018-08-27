// jshint asi:true
const router    = require('express').Router()

router.get('/', (req, res) => {
  let results =[]

  return getHistory()
    .then(history => {

      history.forEach(item => {
        results.push(item)
      })

      res.render('layout', {results: results})
    })
    .catch(e => { throw e })

  function getHistory() {
    return new Promise((resolve, reject) => {
      let history = [{
        name: 'The Matrix',
        date: null,
        images: null,
      }, {
        name: 'The Joy Luck Club',
        date: null,
        images: null,
      }, {
        name: 'Godzilla',
        date: null,
        images: null,
      }]
      resolve(history)
    })
  }
})

module.exports = router