const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const db = require('./models')
const { initializeDatabase } = require('./initdb')

const app = express()
const serverPort = process.env.SERVER_PORT
const mongoHost = process.env.MONGO_HOST
const mongoPort = process.env.MONGO_PORT
const mongoUsername = process.env.MONGO_USERNAME
const mongoPassword = process.env.MONGO_PASSWORD
const mongoDatabase = process.env.MONGO_DATABASE
const url = `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`

db.mongoose.connect(url, {
    auth: {
      authSource: 'admin'
    },
    user: mongoUsername,
    pass: mongoPassword,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(client => {
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cors())
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods: DELETE, GET, POST, OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-access-token, Content-Type, Accept')
        next()
    })
    app.use('/api', require('./routes/api'))
    app.listen(serverPort, () => console.log(`Listening at http://localhost:${serverPort}`))
    initializeDatabase()
})
.catch(console.error)
