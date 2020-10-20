const { connection } = require('mongoose')
const { ObjectId } = require('mongodb')
const { USERS } = require('../../../middlewares/mongodb/collections.js')
const {
    SuccessMessage,
    FailedMessage,
    InternalErrorMessage,
} = require('../../../modules/message')
const global = require('../../../global')

const userColl = connection.collection(USERS)

module.exports = {
    Create: async (param = {}, option = {}) => {
        const {
            email,
            password,
            nickname
        } = param

        let encrypted = '';
        if(password) {
            encrypted = crypto.createHmac('sha1', global.PW_SECRET_KEY)
                .update(password)
                .digest('base64')
        }

        const createdUser = await userColl.insertOne({
            email,
            password,
            nickname,
            type: 'local'
        })

        return { createdUser }
    }
}