process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../src/server/index')
const knex = require('../src/server/db/connection')

describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest() })
      .then(() => { return knex.seed.run() })
  })

  afterEach(() => {
    return knex.migrate.rollback()
  })

  describe('GET /auth/register', () => {
    it('should render the register view', async () => {

    })
  })

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {

    })
  })

  describe('GET /auth/login', () => {
    it('should render the login view', async () => {

    })
  })

  describe('POST /auth/login', () => {
    it('should log the user in', async () => {

    })
  })

  describe('GET /auth/status', () => {
    it('should render the status view', async () => {

    })
  })

  describe('GET /auth/logout', () => {
    it('should logout the user', async () => {

    })
  })
})
