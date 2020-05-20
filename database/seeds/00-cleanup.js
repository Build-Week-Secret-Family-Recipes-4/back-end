
exports.seed = async function(knex) {
  await knex("recipes").truncate()
  await knex("categories").truncate()
  await knex("users").truncate()
};
