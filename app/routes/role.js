const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/role')
const router = express.Router()

router.get('/', controller.getAll)

module.exports = router
