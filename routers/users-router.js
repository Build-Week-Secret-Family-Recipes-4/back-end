const express = require("express");
const users = require("../database/models/users-model");
const {validateUserId, validateUser} = require("../middleware/validate")
const restrict  = require("../middleware/restrict")

const router = express.Router()

router.get("/", restrict, async (req, res, next) => {
    try{
        res.json(await users.find())
    } catch(err) {
        next(err)
    }
})

router.get('/:id', validateUserId(), (req, res) => {
    res.status(200).json(req.user)
  });

router.post('/', validateUser(), (req, res, next) => {
    users.add(req.body)
      .then((user) =>{
        res.status(201).json(user)
      })
      .catch((error) => {
        next(error)
      })
  });

  router.delete('/:id', validateUserId(), (req, res, next) => {
    users.remove(req.params.id)
      .then((count) => {
        res.status(200).json(count)
      })
      .catch((error) => {
        next(error)
      })
  });
  
  router.put('/:id', validateUserId(), (req, res, next) => {
   users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
  });

module.exports = router 