const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {
    mongoose,
    user: require('./user'),
    role: require('./role'),
    roles: ['user', 'admin']
}

module.exports = db
