const knex = require('../connection')

const getMovies = () => knex('movies').select('*')
const getMovie = id => knex('movies').select('*').where({ id: parseInt(id) })
const addMovie = movie => knex('movies').insert(movie).returning('*')

module.exports = {
  getMovies,
  getMovie,
  addMovie
}
