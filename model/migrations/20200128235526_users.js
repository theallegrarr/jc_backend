
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('date_of_birth').notNullable();
    table.string('phone_number').notNullable();
    table.string('security_answer_1').notNullable();
    table.string('security_answer_2').notNullable();
    table.string('security_answer_3').notNullable();
    table.string('password').notNullable();
    table.string('address').notNullable();
    table.string('image');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
