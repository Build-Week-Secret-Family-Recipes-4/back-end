const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session =  require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const restrict = require("../middleware/restrict");
const authRouter = require("../routers/auth-router");
const recipesRouter = require("../routers/recipes-router");
const usersRouter = require("../routers/users-router");

const dbConfig = require("../database/dbConfig")

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
    name:"token",
    resave:false,
    saveUninitialized:false,
    secret: process.env.COOKIE_SECRET || "secret",
    cookie: {
        httpOnly: true
    },
    store: new KnexSessionStore({
        knex: dbConfig,
        createTable: true
    })
}));

server.use("/auth", authRouter);
server.use("/recipes", restrict, recipesRouter);
server.use("/users", usersRouter);

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something is wrong"
    })
})

module.exports = server;