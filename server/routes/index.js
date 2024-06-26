const router = require('express').Router()
const auth = require('./auth')
const users = require('./users')
const pets = require('./pets')
const staffs = require('./staffs')
const service = require('./services')
const analysis = require('./analysis')

router.use('/auth', auth)
router.use('/users', users)
router.use('/pets', pets)
router.use('/staffs', staffs)
router.use('/services', service)
router.use('/services/appointment', service)
router.use('/analysis', analysis)
module.exports = router
