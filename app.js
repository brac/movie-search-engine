// jshint asi:true

const path         = require('path')
const express      = require('express')
const loginRoutes  = require(path.join(__dirname, 'routes/login'))
const signupRoutes = require(path.join(__dirname, 'routes/signup'))
const searchRoutes = require(path.join(__dirname, 'routes/search'))
const bodyParser   = require('body-parser')
const app          = express()
const ejs          = require('ejs')



let user = {name: 'Jon', job: 'president'}

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'))

app.use('/search', searchRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)

app.get('/', (req, res) => {
  res.render('layout')
})

app.get('/', (req, res) => {
  res.render('welcome')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(
    `Moive Search Engine app listening on port ${port}
     http://localhost:${port}`)
})