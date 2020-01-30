const Router = require('koa-router')
const passport = require('koa-passport')
const fs = require('fs')

const queries = require('../db/queries/users')

const router = new Router()

router.get('/auth/register', async ctx => {
  ctx.type = 'html'
  ctx.status = 200
  ctx.body = fs.createReadStream('./src/server/views/register.html')
})

router.post('/auth/register', async ctx => {
  const user = await queries.addUser(ctx.request.body)
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user)
      ctx.redirect('/auth/status')
    } else {
      ctx.status = 400
      ctx.body = { status: 'error' }
    }
  })(ctx)
})
/*
router.get('/auth/login', async ctx => {

})

router.post('/auth/login', async ctx => {
})

router.get('/auth/status', async ctx => {

})

router.get('/auth/logout', async ctx => {

})
*/

module.exports = router
