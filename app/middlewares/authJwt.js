const jwt = require('jsonwebtoken')
const helper = require('../controllers/helper')
const config = require('../config/auth')
const db = require('../models')
const User = db.user
const Role = db.role

verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(403).json(helper.error('No access token provided!'))
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json(helper.error('Unauthorized!'))
        }
        req.userId = decoded.id
        next()
    })
}

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(500).json(helper.error(err))
        }

        Role.find({ _id: { $in: user.roles }}, (err, roles) => {
            if (err) {
                return res.status(500).json(helper.error(err))
            }

            for (let i=0; i<roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next()
                    return
                }
            }

            res.status(403).json(helper.error('Require Admin Role!'))
        })
    })
}

const authJwt = {
    verifyToken,
    isAdmin
}

module.exports = authJwt
