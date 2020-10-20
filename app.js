const fs = require('fs')
const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const nocache = require('nocache')
const morgan = require('morgan')
const app = express()
const https = require('https')
const global = require('./global')
const api = require('./routes/api')
const passport = require('./middlewares/auth')
const request = require('request')

const port = 4000

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({ maxAge:86400000, secret: 'secret', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', api)
app.use('/', express.static(path.join(__dirname, 'public')))

const options = {
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/server.crt')
}
const server = https.createServer(options, app)

server.listen(port, () => {
    console.log(`[system] Start Listening Port(${port})`)
})

///////////////////////// ▼ DB 접근 ▼ /////////////////////////
const mongoose = require('mongoose')

// Node.js의 native Promise 사용
//mongoose.Promise = global.Promise;

const { connection } = require('mongoose')
const { ObjectId } = require('mongodb')
const { USERS } = require('./middlewares/mongodb/collections.js')
const userColl = connection.collection(USERS)

mongoose.connect(global.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    dbName: 'syu-project'
})
.then(async () => {
    console.log('[system] mongodb connect')

    // const list = await userColl.find({
    //     email: 'abs'
    // }, {
    //     projection: {
    //         nickname: true,
    //         email: true,
    //         pw: true,
    //         type: true
    //     }
    // })
    // console.log(list)
})
.catch(e => {
    console.error(e)
})

// const db = mongoose.connection
// db.on('error', console.error)
// db.once('open', () => {
//     console.log('[system] mongodb connect')
// })