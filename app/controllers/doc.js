const express = require('express')
const PrettyTable = require('prettytable')
const router = express.Router()
const buildDoc = () => {
    const table = new PrettyTable()
    table.create(
        ['Method', 'Path', 'Parameters', 'Authenticated', 'Description'],
        [
            ['GET', '/api', '', 'No', 'Get the API documentation.'],
            ['POST', '/api/auth/signup', 'email: String, password: String, firstname: String, lastname: String, roles: [String]', 'No', 'Create an account.'],
            ['POST', '/api/auth/signin', 'email: String, password: String', 'No', 'Sign in to an account.'],
            ['GET', '/api/users/me', '', 'Yes', 'Get user details.'],
            ['GET', '/api/roles', '', 'No', 'Get all roles.'],
        ]
    )
    return table.toString()
}
const doc = buildDoc()

exports.getDoc = (req, res) => {
    res.send(`<pre>${doc}</pre>`)
}
