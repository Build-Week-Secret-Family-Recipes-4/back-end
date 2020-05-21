
exports.seed = async function(knex) {
  await knex("categories").insert([
    {name: "breakfast"},
    {name: "lunch"},
    {name: "snack"},
    {name: "dinner"},
    {name: "dessert"}
  ])
};
