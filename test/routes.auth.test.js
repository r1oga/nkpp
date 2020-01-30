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
      const res = await chai.request(server).get('/auth/register')
      res.redirects.length.should.eql(0)
      res.status.should.eql(200)
      res.type.should.eql('text/html')
      // console.log(res.text)
      const text = res.text.replace(/\s+/g, '')
      text.should.contain('<h1>Register</h1>')
      text.should.contain(
        `<p>
          <button type='submit'>
            Register
          </button>
        </p>`.replace(/\s+/g, '')
      )
    })
  })

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await chai.request(server)
        .post('/auth/register')
        .send({
          username: 'joe',
          password: 'ben'
        })

      res.redirects[0].should.contain('/auth/status')
    })
  })

  describe('GET /auth/login', () => {
    it('should render the login view', async () => {
      const res = await chai.request(server)
        .get('/auth/login')

      res.redirects.length.should.eql(0)
      res.status.should.eql(200)
      res.type.should.eql('text/html')
      res.text.should.contain('<h1>Login</h1>')
      res.text.should.contain("<p><button type='submit'>Login</button></p>")
    })
  })

  /*
  describe('POST /auth/login', () => {
    it('should log the user in', async () => {
      const res = await chai.request('server')
    })
  })

  describe('GET /auth/status', () => {
    it('should render the status view', async () => {
      const res = await chai.request('server')
    })
  })

  describe('GET /auth/logout', () => {
    it('should logout the user', async () => {
      const res = await chai.request('server')
    })
  })
  */
})
