const express = require('express')
const helper = require('./helper')
const db = require('../models')
const router = express.Router()
const Role = db.role

exports.getAll = (req, res) => {
    Role.find({})
    .exec((err, roles) => {
        if (err) {
            return res.status(500).json(helper.error(err))
        }
        res.json(helper.success(roles.map(role => role.toJSON())))
    })
}
