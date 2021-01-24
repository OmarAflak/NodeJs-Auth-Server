const db = require('../models')
const helper = require('../controllers/helper')
const roles = db.roles
const User = db.user

checkDuplicateEmail = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
            return res.status(500).json(helper.error(err))
        }

        if (user) {
            return res.status(400).json(helper.error('Email already exists!'))
        }

        next()
    })
}

checkRolesExist = (req, res, next) => {
    if (req.body.roles) {
        for (let i=0; i<req.body.roles.length; i++) {
            if (!roles.includes(req.body.roles[i])) {
                return res.status(400).json(helper.error(`Role ${req.body.roles[i]} does not exist!`))
            }
        }
    }
    next()
}

const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExist
}

module.exports = verifySignUp
