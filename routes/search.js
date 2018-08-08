// jshint asi:true

const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('You clicked search')
})

// router.get('/:id', (req, res) => {
//   console.log(req.params)
//   res.redirect('/')
// })

module.exports = router