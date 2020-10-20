const router = require('express').Router()

const paths = [
    '/user',
    '/auth'
]

paths.forEach(path => router.use(path, require(`.${path}`)))

module.exports = router