// jshint asi:true

const path    = require('path')
const express = require('express')
const app     = express()
const ejs     = require('ejs')

app.set('view engine', 'ejs')

let user = {name: 'Jon', job: 'president'}

app.get('/', (req, res) => {
  res.render('layout', {mode: 'login'})
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(
    `Moive Search Engine app listening on port ${port}
     http://localhost:${port}`)
})