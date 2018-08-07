// jshint asi:true

const router = require('express').Router()

router.get('/', (req, res) => {
  res.json(req.query)
})

router.get('/:id', (req, res) => {
  res.json(req.params)
})

module.exports = router