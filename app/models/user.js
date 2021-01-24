const mongoose = require('mongoose')
const { toJSON } = require('./helper')

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role'
            }
        ]
    }, { toJSON })
)

module.exports = User
