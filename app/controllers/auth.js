const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const helper = require('./helper')
const config = require('../config/auth')
const db = require('../models')
const User = db.user
const Role = db.role

exports.signup = (req, res) => {
    const createUserWithRoles = roles => {
        new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            roles
        })
        .save((err, user) => {
            if (err) {
                return res.status(500).json(helper.error(err))
            }

            const usr = user.toJSON()
            delete usr.password
            res.json(helper.success(usr, 'User was registered successfully!'))
        })
    }

    if (req.body.roles) {
        Role.find({ name: { $in: req.body.roles }}, (err, roles) => {
            if (err) {
                return res.status(500).json(helper.error(err))
            }

            if (!roles) {
                return res.status(400).json(helper.error('Role does not exist.'))
            }

            createUserWithRoles(roles.map(role => role._id))
        })
    } else {
        Role.findOne({ name: 'user' }, (err, role) => {
            if (err) {
                return res.status(500).json(helper.error(err))
            }
            createUserWithRoles([role._id])
        })
    }
}

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .populate('roles')
    .exec((err, user) => {
        if (err) {
            return res.status(500).json(helper.error(err))
        }

        if (!user) {
            return res.status(404).json(helper.error('User not found.'))
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json(helper.error('Invalid password!'))
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 24 * 60 * 60
        })

        const usr = user.toJSON()
        delete usr.password
        usr.accessToken = token
        res.json(helper.success(usr))
    })
}
