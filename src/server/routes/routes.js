const combineRouters = require('koa-combine-routers')

const indexRouter = require('./index')
const moviesRouter = require('./movies')

module.exports = combineRouters(
  indexRouter,
  moviesRouter
)
