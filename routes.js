const express = require('express')

const controller = require('./controllers.js')

const router = express.Router()

router.post('/store', controller.receiveFile, controller.respond)

module.exports = router