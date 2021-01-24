const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/user')
const router = express.Router()

router.get('/me', [authJwt.verifyToken], controller.getUserById)

module.exports = router
