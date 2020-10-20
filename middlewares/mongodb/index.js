// Mongoose는 Connection을 위한 수단으로만 사용합니다.
// Schema는 성능, 메모리 이슈로 인해 사용하지 않습니다.

const mongoose = require('mongoose')
const { MONGO_CONNEXTION_STRING, MONGO_DB_NAME } = require('../../global')
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, autoReconnect: true, reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000, dbName: MONGO_DB_NAME })

const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('Mongoose Connect!')
})