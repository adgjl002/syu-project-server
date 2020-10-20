const { connection } = require('mongoose')
const { ObjectId } = require('mongodb')
const { USERS } = require('../../../middlewares/mongodb/collections.js')

const userColl = connection.collection(USERS)

module.exports = {
    GetList: async (param = {}, option = {}) => {
        const { _id, email, nickname } = param
        const { skip, limit } = option
        const filter = {}

        console.log(param)
        if(_id) filter._id = new ObjectId(_id)
        if(email) filter.email = email
        if(nickname) filter.nickname = nickname
        console.log(filter)
        const list = await userColl.find(filter,
            {
                projection: {
                    nickname: true,
                    email: true,
                    createdAt: true,
                    password: true,
                },
                sort: { createAt: -1 },
                skip,
                limit
            }).toArray()

            console.log(list)

        return { list, count: list ? list.length : 0 }
    }
}