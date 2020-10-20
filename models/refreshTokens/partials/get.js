const { connection } = require('mongoose')
const { ObjectId } = require('mongodb')
const { REFRESH_TOKENS } = require('../../../middlewares/mongodb/collections.js')
const {
    SuccessMessage,
    FailedMessage,
    InternalErrorMessage,
} = require('../../../modules/message')
const global = require('../../../global')

const refreshTokenColl = connection.collection(REFRESH_TOKENS)

module.exports = {
    GetList: async (param = {}) => { 
        const { userId } = param

        const results = refreshTokenColl.find({ userId })

        return results
    }
}