const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('./config/auth')
const db = require('./models')

exports.initializeDatabase = () => {
    const User = db.user
    const Role = db.role

    Role.estimatedDocumentCount((err, count) => {
        if (err || count > 0) {
            return
        }

        Role.insertMany([
            { name: 'user' },
            { name: 'admin' }
        ], (err, roles) => {
            if (err) {
                return
            }

            roles.forEach(role => {
                console.log(`added '${role.name}' to roles collection`)

                new User({
                    email: `${role.name}@gmail.com`,
                    password: bcrypt.hashSync(role.name, 8),
                    roles: [role._id]
                }).save((err, user) => {
                    if (err) {
                        return
                    }

                    const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 365 * 24 * 60 * 60 })
                    console.log(`added ${role.name}@gmail.com to users collection. Token: ${token}`);
                })
            })
        })
    })
}
