const recipe = require("../database/models/recipes-model")
const users = require("../database/models/users-model")


function validateRecipeId() {
    return(req, res, next) => {
      recipe.getByRecipeId(req.params.id)
      .then((recipe) => {
        if(recipe){
          req.recipe = recipe
          next()
        } else {
          res.status(400).json({
              message: "invalid recipe id"
          })
        }
      })
      .catch((error) => {
        next(error)
      })
    }  
  }

  function validateUserId() {
    return(req, res, next) => {
      users.findById(req.params.id)
      .then((user) => {
        if(user){
          req.user= user
          next()
        } else {
          res.status(400).json({
              message: "invalid user id"
          })
        }
      })
      .catch((error) => {
        next(error)
      })
    }  
  }
  
  function validateUser() {
    return (req, res, next)=> {
      if(!req.body.name){
        return res.status(400).json({
          message: "missing required name field"
        })
      }
      users.add(!req.body)
        .then((user) => {
          res.status(201).json(user)
        })
        .catch((error) => {
          console.log(error)
          res.status(400).json({
            message: "missing user data"
          })
        })
      next();
  
    }
  }

  module.exports ={ 
      validateRecipeId,
      validateUser,
      validateUserId
  }