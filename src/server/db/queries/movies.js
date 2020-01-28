const knex = require('../connection')

const getMovies = () => knex('movies').select('*')
const getMovie = id => knex('movies').select('*').where({ id: parseInt(id) })

module.exports = {
  getMovies,
  getMovie
}
