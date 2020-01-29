const knex = require('../connection')

const getMovies = () => knex('movies').select('*')
const getMovie = id => knex('movies').select('*').where({ id: parseInt(id) })
const addMovie = movie => knex('movies').insert(movie).returning('*')
const updateMovie = (id, movie) => {
  return knex('movies')
    .update(movie)
    .where({ id: parseInt(id) })
    .returning('*')
}
const deleteMovie = id => {
  return knex('movies')
    .del()
    .where({ id: parseInt(id) })
    .returning('*')
}

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie
}
