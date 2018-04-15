
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('punches', function(table) {
      table.increments('id').primary();
      table.dateTime('punch_in');
      table.dateTime('punch_out');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('punches'),
  ]);  
};
