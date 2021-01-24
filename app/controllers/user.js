const express = require('express')
const helper = require('./helper')
const db = require('../models')
const router = express.Router()
const User = db.user

exports.getUserById = (req, res) => {
    User.findById(req.userId)
    .populate('roles')
    .exec((err, user) => {
        if (err) {
            return res.status(500).json(helper.error(err))
        }

        if (user) {
            const usr = user.toJSON()
            delete usr.password
            res.json(helper.success(usr))
        } else {
            res.status(404).json(helper.error('User not found.'))
        }
    })
}
