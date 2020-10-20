const router = require('express').Router()
const controller = require('./auth.controller')
const passport = require('passport');

router.post('/signup', controller.signupProcess)
router.post('/login', passport.authenticate('local'), controller.loginProcess)

module.exports = router