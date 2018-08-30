// jshint asi:true

const path          = require('path')
const fs            = require('fs')
const https         = require('https')
const express       = require('express')
const loginRoutes   = require(path.join(__dirname, 'routes/login'))
const signupRoutes  = require(path.join(__dirname, 'routes/signup'))
const apiRoutes     = require(path.join(__dirname, 'routes/api'))
const Cryptr        = require('cryptr')
const ejs           = require('ejs')
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser')
const cookieSession = require('cookie-session')
const onHeaders     = require('on-headers')
const config        = process.env.CONFIG_KEY == undefined ? require('./config').key : process.env.CONFIG_KEY
const cryptr        = new Cryptr(config.toString('hex').slice(0,16))
const { findUser }  = require('./database/queries')
const app           = express()

app.use(cookieSession({
  name: 'session',
  keys: config,
  maxAge: 30 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser())

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use((req, res, next) => {
  req.session = decyrptSession(req.cookies.sessionCookie)

  onHeaders(res, () => {
    let encryptedTest = encryptSession(req.session)

    res.cookie('sessionCookie', encryptSession(req.session))
  })
  next()
})

app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)
app.use('/api', apiRoutes)
app.get('/logout', (req, res) => {
  req.session = {}
  res.redirect('/login')
})

app.get('/', (req, res, next) => {
  if (!req.session.name) {
    return res.redirect('/login')
  }

  findUser(req.session.name)
    .then( user => {
      if (user.received === 0) {
        return res.redirect('login')
      } else {
        return res.render('layout', {
          name: req.session.name,
          results: null,
        })
      }
    })
    .catch(next)
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

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(`
    Something broke! :
    ${err}
  `)
})

const port = process.env.PORT || 3000

if(!module.parent || process.env.HEROKU != 'true'){
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