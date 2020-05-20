
exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {
      table.increments("id")
      table.text("firstname").notNull()
      table.text("lastname").notNull()
      table.text("email").notNull().unique()
      table.text("username").notNull().unique()
      table.text("password").notNull()
  })

  await knex.schema.createTable("categories", (table) => {
      table.increments("id")
      table.text("name").notNull().unique()

  })

  await knex.schema.createTable("recipes", (table) => {
      table.increments("id")
      table.text("title").notNull()
      table.text("source").notNull()
      table.text("ingredients").notNull()
      table.text("instructions").notNull()
      table.integer("category_id")
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
      table.integer("user_id")
        .references("id")
        .inTable("users") 
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("recipes")
  await knex.schema.dropTableIfExists("categories")
  await knex.schema.dropTableIfExists("users")
};
