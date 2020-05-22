const express = require("express")
const users = require("../database/models/users-model")
const bcrypt = require("bcryptjs");

const router = express.Router()

router.post('/register', async (req, res, next) => {
    try {
      const {username} = req.body
      const user = await users.findBy({username}).first()
  
      if(user){
          return res.status(409).json({
              message: "username already taken"
          })
      }
      res.status(201).json(await users.add(req.body))
  }catch(err){
      next(err)
  }
  });


 router.post("/login", (req, res) => {
    let { username, password } = req.body;
    users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compare(password, user.password)) {
          console.log(req.session)
          req.session.user = user;
          res.status(200).json({ message: `Welcome back ${user.username}!` });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.get("/logout", (req, res) => {
    if(req.session) {
      req.session.destroy(err => {
        if(err) {
          next(err)
        } else {
          res.status(200).json({
            message: "logged out"
          })
        }
      })
    } else {
      res.redirect("/login")
      }
 })



  
  module.exports = router;
  