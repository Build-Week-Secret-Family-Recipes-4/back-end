
exports.up = async function(knex) {
  await knex.schema.alterTable("recipes", (table) => {
      table.string("description")

  })
};

exports.down = async function(knex) {
    await knex.schema.dropColumn("desciption")
};
