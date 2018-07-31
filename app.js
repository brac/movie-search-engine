// jshint asi:true

const path    = require('path')
const express = require('express')
const app     = express()
const ejs     = require('ejs')

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.get('/', (req, res) => {
  res.render('index')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(
    `Moive Search Engine app listening on port ${port}
     http://localhost:${port}`)
})