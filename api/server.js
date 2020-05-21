const express = require("express");
const cors = require("cors");
const helmet = require("helmet");



const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use()

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something is wrong"
    })
})

module.exports = server;
