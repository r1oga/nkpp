const bcrypt = require('bcryptjs')

exports.seed = knex => {
  return knex('users').del()
    .then(() => {
      const salt = bcrypt.genSaltSync()
      const hash = bcrypt.hashSync('Hayek', salt)
      return knex('users').insert({
        username: 'Fred',
        password: hash
      })
    })
}
