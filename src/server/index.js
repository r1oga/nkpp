const Koa = require('koa')
/*
Koa does not parse body request by default.
Need a middleware for body parsing (e.g POST request)
*/
const bodyParser = require('koa-bodyparser')
const indexRoutes = require('./routes/index').routes()
const moviesRoutes = require('./routes/movies').routes()

const app = new Koa()
const PORT = process.env.PORT || 1337

app.use(bodyParser())
app.use(indexRoutes)
app.use(moviesRoutes)

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
