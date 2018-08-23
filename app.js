// jshint asi:true

const path          = require('path')
const fs            = require('fs')
const https         = require('https')
const express       = require('express')
const loginRoutes   = require(path.join(__dirname, 'routes/login'))
const signupRoutes  = require(path.join(__dirname, 'routes/signup'))
const searchRoutes  = require(path.join(__dirname, 'routes/search'))
const historyRoutes = require(path.join(__dirname, 'routes/history'))
const Cryptr        = require('cryptr')
const ejs           = require('ejs')
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser')
const cookieSession = require('cookie-session')
const onHeaders     = require('on-headers')
// const actions       = require('./actions')
const config        = require('./config')
const cryptr        = new Cryptr(config.key)

const app           = express()

app.use(cookieSession({
  name: 'session',
  keys: config.key,
  maxAge: 30 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser())

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use((req, res, next) => {
  if (req.cookies.sessionCookie == undefined) {
    req.session = {}
  } else {
    req.session = req.cookies.sessionCookie
  }

  onHeaders(res, () => {
    res.cookie('sessionCookie', req.session)
  })

  next()
})

app.use('/search', searchRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)
app.use('/history', historyRoutes)

app.get('/', (req, res) => {
  if (!req.session.name) {
    return res.redirect('/login')
  }

  res.render('layout', {
    name: req.session.name,
    results: null,
  })
})

function encryptSession(session){
  if (!session) {
    session = {}
  }

  return cryptr.encrypt(JSON.stringify(session))
}

function decyrptSession(string) {
  if (typeof string === 'undefined') {
    return {}
  }
  return JSON.parse(cryptr.decrypt(string))
}

const port = process.env.PORT || 3000

if(!module.parent){
    https.createServer({
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert')
    },app)
    .listen(port, () => {
      console.log(
        `Moive Search Engine app listening on port ${port}
         https://localhost:${port}`)
      })
}

module.exports= app