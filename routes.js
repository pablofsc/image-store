const express = require('express')

const controllers = require('./controllers.js')
const utils = require('./utils.js')
const router = express.Router()

router.post('/store', utils.receiveFile, controllers.respond)
router.get('/', controllers.index)

module.exports = router