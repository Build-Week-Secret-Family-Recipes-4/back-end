const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const restrict = require("../middleware/restrict");
const authRouter = require("../routers/auth-router");
const recipesRouter = require("../routers/recipes-router");
const usersRouter = require("../routers/users-router");


const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(cookieParser())

server.use("/auth", authRouter);
//server.use("/recipes", restrict(), recipesRouter);
server.use("/recipes", recipesRouter);
server.use("/users", restrict(), usersRouter);

server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something is wrong"
    })
})

module.exports = server;