require('dotenv').config()
const path = require('path')
const BASE_PATH = path.join(__dirname, 'src', 'server', 'db')

module.exports = {
  test: {
    client: 'pg',
    connection: {
      database: 'koa_api_test',
      user: 'gry0u',
      password: process.env.DB_PWD,
      port: 5432
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },

  development: {
    client: 'pg',
    connection: {
      database: 'koa_api',
      user: 'gry0u',
      password: process.env.DB_PWD,
      port: 5432
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }

}
