require('dotenv').config()

const config = {
    JWT_ACCESS_SECRET: 'Se4!2vfgDef^3422SDq',
    JWT_REFRESH_SECRET: '80179eb4bac54a01a937b159f8e7809a',
    JWT_ISSUER: 'syu-project-server.com',

    PW_SECRET_KEY: 'SeCrEtKeYfOrHaShInG',
    MONGO_CONNECTION_STRING: 'mongodb+srv://syu:1152e7q8w9e@cluster0.rc7my.gcp.mongodb.net/syu-project?retryWrites=true&w=majority'
}

module.exports = config