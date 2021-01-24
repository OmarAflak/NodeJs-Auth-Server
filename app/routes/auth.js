const express = require('express')
const { verifySignUp } = require('../middlewares')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/signup', [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExist], controller.signup)
router.post('/signin', controller.signin)

module.exports = router
