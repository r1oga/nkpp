process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../src/server/index')
const knex = require('../src/server/db/connection')

describe('routes: movies', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  })

  afterEach(() => knex.migrate.rollback())

  describe('GET /api/v1/movies', () => {
    it('should return all movies', (done) => {
      chai.request(server)
        .get('/api/v1/movies')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err)
          // there should be a 200 status code
          res.status.should.equal(200)
          // the response should be JSON
          res.type.should.equal('application/json')
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success')
          // the JSON response body should have a
          // key-value pair of {"data": [3 movie objects]}
          res.body.data.length.should.eql(2)
          // the first object in the data array should
          // have the right keys
          res.body.data[0].should.include.keys(
            'id', 'name', 'genre', 'rating', 'explicit'
          )
          done()
        })
    })
  })

  describe('GET /api/v1/movies/:id', () => {
    it('should respond with a single movie', done => {
      chai.request(server)
        .get('/api/v1/movies/1')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err)
          // there should be a 200 status code
          res.status.should.equal(200)
          // the response should be JSON
          res.type.should.equal('application/json')
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success')
          // the JSON response body should have a
          // key-value pair of {"data": 1 movie object}
          res.body.data[0].should.include.keys(
            'id', 'name', 'genre', 'rating', 'explicit'
          )
          done()
        })
    })

    it('should throw an error if movie does not exist', done => {
      chai.request(server)
        .get('/api/v1/movies/9999999')
        .end((err, res) => {
          // there should be a 404 status code
          res.status.should.equal(404)
          // the response should be JSON
          res.type.should.equal('application/json')
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error')
          // the JSON response body should have a
          // key-value pair of {"message": "That movie does not exist."}
          res.body.message.should.eql('That movie does not exist.')
          done()
        })
    })
  })

  describe('POST /api/v1/movies', () => {
    it('should return the movie that was added', done => {
      chai.request(server)
        .post('/api/v1/movies')
        .send({
          name: 'Back to the Future',
          genre: 'Comedy',
          rating: 8,
          explicit: false
        })
        .end((err, res) => {
          should.not.exist(err)
          // 201 status code (indicating that something was "created")
          res.status.should.equal(201)
          res.type.should.equal('application/json')
          res.body.status.should.eql('success')
          res.body.data[0].should.include.keys(
            'id', 'name', 'genre', 'rating', 'explicit'
          )
          done()
        })
    })

    it('should throw an error if the payload is malformed', done => {
      chai.request(server)
        .post('/api/v1/movies')
        .send({
          name: 'Titanic'
        })
        .end((err, res) => {
          res.status.should.equal(400)
          res.type.should.equal('application/json')
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error')
          // the JSON response body should have a message key
          should.exist(res.body.message)
          done()
        })
    })
  })

  describe('PUT /api/v1/movies', () => {
    it('should return the movie that was updated', async () => {
      const movies = await knex('movies').select('*')
      const movie = movies[0]
      const res = await chai.request(server)
        .put(`/api/v1/movies/${movie.id}`)
        .send({ rating: 0 })

      // should.not.exist(err)
      res.status.should.equal(200)
      res.type.should.equal('application/json')
      res.body.status.should.eql('success')
      res.body.data[0].should.include.keys(
        'id', 'name', 'genre', 'rating', 'explicit'
      )
      // ensure the movie was in fact updated
      const newMovie = res.body.data[0]
      newMovie.rating.should.not.eql(movie.rating)
    })

    it('should throw an error if the movie does not exist', async () => {
      const res = await chai.request(server)
        .put('/api/v1/movies/99')
        .send({ rating: 1 })

      res.status.should.equal(404)
      res.type.should.equal('application/json')
      res.body.status.should.eql('error')
      res.body.message.should.eql('Movie not found')
    })
  })
})
