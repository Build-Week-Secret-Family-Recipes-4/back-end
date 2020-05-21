const bcrypt = require("bcryptjs")
const users = require("../users/users-model")

function restrict() {
    return async (req, res, next) => {
            try {
                if(!req.session || !req.session.user) {
                    return res.status(401).json({
                        message: "wrong info"
                    })
                } next()
            } catch (err) {
                next(err)
            }
    }
}

module.exports = {
    restrict
}