exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(() => {
      // Inserts seed entries
      return knex('movies').insert([
        {
          name: 'Star Wars',
          genre: 'Science Fiction',
          rating: 8,
          explicit: true
        },
        {
          name: 'Peanut Butter Falcon',
          genre: 'Drama',
          rating: 7,
          explicit: true
        }
      ])
    })
}
