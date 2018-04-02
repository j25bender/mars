exports.seed = function(knex, Promise) {
  return knex('items').del()
  .then(() => {
    return Promise.all([
      knex('items').insert([
        {id: 1, name: 'pickaxe', packed: true},
        {id: 2, name: 'oxygen', packed: true},
        {id: 3, name: 'rover', packed: true}
      ])
    ]);
  });
};
