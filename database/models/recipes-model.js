const db = require("../dbConfig");

function getRecipes(){
    return db('recipes')
}

function getByRecipeId(id){
    return db('recipes')
    .where({id})
    .first()
}

function addRecipe(recipe){
    return db('recipes')
    .insert(recipe)
    .then(ids => {
        return getByRecipeId(ids[0])
    })
}

function updateRecipe(id, changes){
    return db('recipes')
    .where({id})
    .update(changes)
}

function removeRecipe(id){
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