const express = require('express')
const router  = express.Router()
const {authenticate}    = require('../middleware/auth')
const ctrl    = require('../controllers/contentController')

router.get('/',       authenticate, ctrl.getAll)
router.get('/:page',  ctrl.getByPage)
router.put('/',       authenticate, ctrl.update)

module.exports = router