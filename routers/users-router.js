const express = require("express")
const users = require("../database/models/users-model")
const {restrict} =require("../middleware/restrict")

const router = express.Router()

router.get("/", restrict(), async (req, res, next) => {
    try{
        res.json(await users.find())
    } catch(err) {
        next(err)
    }
})

module.exports = router 