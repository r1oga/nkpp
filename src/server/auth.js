const passport = require('koa-passport')
const knex = require('./db/connection')

passport.serializeUser((user, done) => { done(null, user.id) })
passport.deserializeUser((user, done) => {
  return knex('users')
    .where({ id })
    .first()
    .then(user => { done(null, user) })
    .catch(err => { done(err, null) })
})
