const combineRouters = require('koa-combine-routers')

const indexRouter = require('./index')
const moviesRouter = require('./movies')
const authRouter = require('./auth')

module.exports = combineRouters(
  indexRouter,
  moviesRouter,
  authRouter
)
