const express = require("express")
const recipes = require("../database/models/recipes-model")
const {validateRecipeId} = require("../middleware/validate")
const restrict = require("../middleware/restrict");

const router = express.Router()


router.get('/', restrict(), (req, res, next) => {
    recipes.getRecipes()
    .then(recipes => {
        res.json(recipes);
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', (req, res, next) => {
    recipes.getByRecipeId(req.params.id)
    .then(recipe => {
        if(recipe){
            res.json(recipe);
        }else{
            res.status(401).json({
                message: "No such recipe"
            })
        }
    })
    .catch(err => {
        next(err)
    })
})

router.post('/', (req, res, next) => {
    recipes.addRecipe({ ...req.body, user_id: req.token.userId })
    .then(recipe => {
        res.status(201).json(recipe);
    })
    .catch(err => {
        next(err)
    })
})

router.put('/:id', validateRecipeId(), (req, res, next) => {
    recipes.updateRecipe(req.params.id, req.body)
    .then((recipe) => {
        res.status(200).json(recipe)
    })
    .catch(err => {
        next(err)
    })
})

router.delete('/:id', validateRecipeId(), (req, res, next) => {
    recipes.updateRecipe(req.params.id, req.body)
    .then((recipe) => {
        res.status(200).json(recipe)
    })
    .catch(err => {
        next(err)
    }) 
})

module.exports = router 