const router = require('express').Router()
const auth = require('./auth')
const users = require('./users')
const pets = require('./pets')
const { 
    createStorageService
 } = require("../controllers/services.controller")

router.use('/auth', auth)
router.use('/users', users)
router.use('/pets', pets)
