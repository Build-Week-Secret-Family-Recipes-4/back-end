
exports.seed = async function(knex) {
 await knex("recipes").insert([
   {
    title: "Easy Chopped Vegtable Salad",
    source: "Rachael Ray",
    ingredients: "chopped cucumbers, chopped bell peppers, chopped tomatoes, chopped red onions, chopped parsley, chopped thyme, drizzling of sherry vinegar, drizzling of extra-virigin olive oil, salt and pepper.",
    instructions: "Chop the produces and drizzle the liquid. Sprinkle the salt and pepper. Then mix all together.",
    category_id: 2
   },
   {
    title: "Dirty P's Garlic-Ginger Chicken Thighs",
    source: "Guy Fieri",
    ingredients: "2lb boneless chicken thighs, 1 cup sliced red onions, 2 tbsp minced garlic, 2tbsp minced ginger, 1/4 cup soy sauce, 1/4 cup orange juice, gounded peper, veggie oil for grill",
    instructions: "Combine all ingredients except oil into resealable plastic and shake to coat chicken marinade. Refriegerate for 1 hour or overnight. Preheat grill to med-high and oil grate. Grill chicken until marked for 5 mins then flip around and grill for 5 mins more.",
    category_id: 4
   },
   {
    title: "Easy Waffles",
    source: "Martha Stewart",
    ingredients: "1 cup all-purpose flour, 2tbsp sugar, 1tsp baking powder, 1/4tsp salt, 1 cup milk, 2 large eggs, 4tbsp unsalted butter melted, maple syrup and butter for serving",
    instructions: "Preheat waffle iron. In large bowl, whisk all dry ingredients. In small bowl, whisk milk and eggs. Then gently whisk to combine both bowls. Whisk in butter. Cook waffle until crisps for 2-3 mins.",
    category_id: 1
   },
   {
    title: "Best Brownies",
    source: "Angie from Allrecipes",
    ingredients: "1/2 cup butter, 1 cup white sugar, 2 eggs, 1tsp vanilla extract, 1/3 cup unsweetened cocoa powder, 1/2 cup all-purpse flour, 1/4tsp salt, 1/4tsp baking powder",
    instructions: "Preheat oven to 350 degrees F. Grease and flour 8in square pan. In large saucepan, melt butter. Removed form heat, and stir in sugar, eggs, and vanilla. Beat in cocoa, flour, salt and baking powder. Spread in pan. Bake for 25-30mins.",
    category_id: 5
   },

 ])
};
