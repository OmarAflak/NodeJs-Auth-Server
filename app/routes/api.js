const express = require('express')
const router = express.Router()

router.use('/', require('../routes/doc'))
router.use('/auth', require('../routes/auth'))
router.use('/users', require('../routes/user'))
router.use('/roles', require('../routes/role'))
router.use((_, res) => res.status(404).send('Cannot find requested route.'))

module.exports = router
