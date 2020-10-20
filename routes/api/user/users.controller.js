const { connection } = require('mongoose')
const { ObjectId } = require('mongodb')
const { USERS, TEMPLATES, RENDERLOG, PAYMENTS, PRODUCTS, VIDEOS } = require('../../../middlewares/mongodb/collections')
const User = require('../../../models/users')
const {
    SuccessMessage,
    FailedMessage,
    InternalErrorMessage,
} = require('../../../modules/message')

exports.checkExistsNickname = async (req, res) => {
    try {
        const { nickname } = req.query
        const users = await User.GetList({ nickname })

        console.log("CHECK EXISTS NICKNAME")
        console.log(users)
        if(users && users.list && users.list.length > 0) {
            res.send(new SuccessMessage({ result: "EXISTS" }))
        }
        else {
            res.send(new SuccessMessage({ result: "NOT_EXISTS" }))
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send(new InternalErrorMessage())
    }
}

exports.checkExistsEmail = async (req, res) => {
    try {
        const { email } = req.query
        const users = await User.GetList({ email })

        if(users && users.length > 0) {
            res.send(new SuccessMessage({ result: "EXISTS" }))
        }
        else {
            res.send(new SuccessMessage({ result: "NOT_EXISTS" }))
        }
    }
    catch(err) {
        console.log(err)    
        res.status(500).send(new InternalErrorMessage())
    }
}

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const { id, email, nickname } = req.query
        let { offset, limit } = req.query

        const params = {}
        if(id) params.id = id
        if(email) params.email = email
        if(nickname) params.nickname = nickname

        offset = isNaN(offset) ? 0 : Number(offset)
        limit = isNaN(limit) ? 16 : Number(limit)

        const result = await User.GetList(params)
        result.list.forEach(item => {
            console.log(item.doc)
        })
        res.send(new SuccessMessage(result))
    }
    catch (err) {
        console.log(err)
        res.status(500).send(new InternalErrorMessage())
    }
}

exports.create = async (req, res) => {
    //console.log(req.body)
    try {
        const { email, password, nickname } = req.body
        console.log(email)
        console.log(password)
        console.log(nickname)

        const createdUser = await User.Create({
            email,
            password,
            nickname
        })

        res.send(new SuccessMessage())
    }
    catch (err) {
        console.log(err)
        res.status(500).send(new InternalErrorMessage())
    }
}