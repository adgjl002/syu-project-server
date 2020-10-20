const router = require('express').Router()
const controller = require('./users.controller')
const passport= require('passport');

router.get('/exists-nickname', controller.checkExistsNickname)
router.get('/exists-email', controller.checkExistsEmail)

router.get('/list', controller.list)
//router.post('/create', controller.create)

module.exports = router