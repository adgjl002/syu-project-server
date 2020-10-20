const { connection } = require('mongoose')
const { ObjectId } = require('mongodb')
const { LAST_LOGIN_IP } = require('../../../middlewares/mongodb/collections.js')
const {
    SuccessMessage,
    FailedMessage,
    InternalErrorMessage,
} = require('../../../modules/message')
const global = require('../../../global')

const lastloginipColl = connection.collection(LAST_LOGIN_IP)

module.exports = {
    Create: async (param = {}, option = {}) => {
        const {
            userId,
            ip
        } = param

        const date =  new Date()

        if(!userId) throw FailedMessage({
            ERROR_CODE: 'ERR_INVALID_PARAM',
            DESCRIPTION: 'ID 파라미터가 잘못되었습니다.'
        })
        else if(!ip) throw FailedMessage({
            ERROR_CODE: 'ERR_INVALID_PARAM',
            DESCRIPTION: 'IP 파라미터가 잘못되었습니다.'
        })

        const lastLoginIp = await lastloginipColl.insertOne({
            userId,
            ip,
            date
        })

        return { lastLoginIp }
    }
}