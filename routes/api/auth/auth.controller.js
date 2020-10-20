const { connection } = require('mongoose')
const { ObjectId } = require('mongodb')
const { USERS, TEMPLATES, RENDERLOG, PAYMENTS, PRODUCTS, VIDEOS } = require('../../../middlewares/mongodb/collections')
const User = require('../../../models/users')
const RefreshToken = require('../../../models/refreshTokens')
const LastLoginIP = require('../../../models/lastLoginIP')
const {
    SuccessMessage,
    FailedMessage,
    InternalErrorMessage,
} = require('../../../modules/message')
const jwt = require('jsonwebtoken')
const Global = require('../../../global')

const validateEmail = (email) => {
    // 최소한의 이메일 검증
    const regex = /\S+@\S+\.\S+/;
    if (email === "admin") return true
    if (typeof email !== 'string' || !regex.test(email)) {
        return false
    }
    return true
}

const existsEmail = async (email) => {
    const users = await User.GetList({ email })
    console.log("EXISTS EMAIL " + email)
    console.log(users)
    return users && users.list.length > 0
}

const createAccessToken = (user) => {
    return new Promise((res, rej) => {
        jwt.sign(
            {
              _id: userId
            },
            Global.JWT_ACCESS_SECRET, 
            {
                expiresIn: '12h',
                issuer: Global.JWT_ISSUER
            }, (err, token) =>
            {
                if(err) return rej(err)
                else {
                    return res(token)
                }
            })

            try {
                res.send(new SuccessMessage())
            }
            catch (err) {
                console.log(err)
                res.status(500).send(new InternalErrorMessage())
            }
    })
}

const createRefreshToken = (user) => {
    return new Promise((res, rej) => {
        jwt.sign(
            {
              _id: user._id
            },
            Global.JWT_REFRESH_SECRET, 
            {
                expiresIn: '14d',
                issuer: Global.JWT_ISSUER
            }, (err, token) =>
            {
                if(err) return rej(err)
                else {
                    return res(token)
                }
            })
        
            try {
                res.send(new SuccessMessage())
            }
            catch (err) {
                console.log(err)
                res.status(500).send(new InternalErrorMessage())
            }
    })
}

exports.getNickname = async (req, res) => {
    const { nickname } = req.query
}

exports.signupProcess = async (req, res) => {
    const { nickname, email, pw } = req.body

    try {
        // 닉네임 검증
        if (!nickname) {
            console.log("닉네임 검증 실패 " + nickname)
            // Bad Request
            res.status(400).send(new FailedMessage({
                ERROR_CODE: "ERR_INVALID_PARAM",
                DESCRIPTION: "파라미터가 잘못되었습니다."
            }))
            return
        }

        // 이메일 검증
        if (!email || !validateEmail(email)) {
            console.log("이메일 검증 실패 " + email)
            res.status(400).send(new FailedMessage({
                ERROR_CODE: "ERR_INVALID_PARAM",
                DESCRIPTION: "파라미터가 잘못되었습니다."
            }))
            return
        }
        else if(await existsEmail(email)) {
            console.log("이미 존재하는 이메일 " + email)
            res.status(400).send(new FailedMessage({
                ERROR_CODE: "ALREADY_EXIST",
                DESCRIPTION: "데이터가 이미 존재합니다."
            }))
            return
        }

        // 비밀번호 검증
        if (!pw) {
            console.log("비밀 번호 검증 실패 " + pw)
            res.status(400).send(new FailedMessage({
                ERROR_CODE: "ERR_INVALID_PARAM",
                DESCRIPTION: "파라미터가 잘못되었습니다."
            }))
            return
        }

        // accessToken 발급
        // refreshToken 발급

        res.cookie()

        const createdUser = await User.Create({ nickname, email, password:pw })
        res.send(new SuccessMessage())
    }
    catch (err) {
        console.log(err)
        res.status(500).send(new InternalErrorMessage())
    }
}

exports.loginProcess = async (req, res) => {
    const ip = req.headers['x-client-ip'] || req.connection.remoteAddress
    const userId = req.user._id
    console.log("CREATE ACCESS TOKEN")
    console.log(ip)
    console.log(userId);
    console.log("###")

    // passport를 통해서 이메일 및 비밀번호 검증이 끝난 상태

    const accessToken = await createAccessToken(req.user)
    const refreshToken = await createRefreshToken(req.user)
    var lastLoginIp = LastLoginIP.Create({userId, ip}).catch(e => console.log(e))

    try {
        const createRefreshTokenResults = await RefreshToken.Create({ refreshToken, userId })
        console.log(createRefreshTokenResults)

        res.send(new SuccessMessage({
            result: "SUCCESS",
            data: { accessToken }
        }))
    }
    catch (e) {
        console.log(err)
        res.status(500).send(new InternalErrorMessage())
    }
}
