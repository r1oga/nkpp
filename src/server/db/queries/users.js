const knex = require('../connection')

const addUser = user => {
  return knex('users')
    .insert({
      username: user.username,
      password: user.password
    })
    .returning('*')
}

module.exports = {
  addUser
}
