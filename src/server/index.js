const Koa = require('koa')
const passport = require('koa-passport')
const session = require('koa-session')
const RedisStore = require('koa-redis')
/*
Koa does not parse body request by default.
Need a middleware for body parsing (e.g POST request)
*/
const bodyParser = require('koa-bodyparser')
const router = require('./routes/routes')

const app = new Koa()
const PORT = process.env.PORT || 1337

// Middlewares
// sessions
// change this key for production!
app.keys = ['super-secret-key']
app.use(session({ store: new RedisStore() }, app))

// body parser
app.use(bodyParser())

// authentication
require('./auth') // to handle serializing and de serializing
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use(router())

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
