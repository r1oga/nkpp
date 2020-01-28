const Koa = require('koa')
const routes = require('./routes/index').routes()

const app = new Koa()
const PORT = process.env.PORT || 1337

app.use(routes)

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
