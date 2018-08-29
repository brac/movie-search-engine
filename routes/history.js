// jshint asi:true
// TODO: DELETE FILE

const router            = require('express').Router()
const { findHistory }   = require('../database/queries')

// router.get('/', (req, res) => {
//   let results =[]

//   return findHistory(req.session.name)
//     .then(history => {
//       history.forEach( item => {
//         results.push({
//           name: item.search_term,
//           date: null,
//           images: null
//         })
//       })
//       console.log(results)
//       res.render('layout', {results: results})
//     })
//     .catch(e => { throw e })
// })

module.exports = router