const express = require('express')

const controller = require('../controllers/image-store.js')

const router = express.Router()

router.post('/store', controller.uploadFile, controller.upload)
router.post('/remove-everything', controller.removeAll)

router.get('/stored/all', controller.retrieveAll)
router.get('/stored/:id', controller.retrieve)

module.exports = router