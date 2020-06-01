const db = require("../dbConfig");

function getRecipes(){
    return db('recipes')
    .join('categories', 'categories.id', 'recipes.category_id')
    .select('recipes.*', 'categories.name')
}

function getByRecipeId(id){
    return db('recipes')
    .where({id})
    .first()
}

async function addRecipe(recipe) {
    const category_id = await db('categories')
      .where({ name: recipe.category.toLowerCase() })
      .select("id")
      .first()
    if (recipe.category) delete recipe.category
    return db('recipes')
      .insert({ ...recipe, category_id })
      .then((ids) => {
        return getByRecipeId(ids[0])
      })
  }

function updateRecipe(id, changes){
    if (recipe.id) delete recipe.id
    return db('recipes')
    .where({id})
    .update(changes)
}

function removeRecipe(id){
    if (recipe.id) delete recipe.id
    return db('recipes')
    .where('id',id)
    .del()
}



module.exports ={
    getRecipes,
    getByRecipeId,
    addRecipe,
    updateRecipe,
    removeRecipe
}