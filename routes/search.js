// jshint asi:true

const router = require('express').Router()

router.get('/', (req, res) => {



  res.render('main', { results })
})

// router.get('/:id', (req, res) => {
//   console.log(req.params)
//   res.redirect('/')
// })

module.exports = router