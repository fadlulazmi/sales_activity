const router = require('express').Router()
const Staff = require('./staffRoute')
const Customer = require('./customerRoute')

router.use('/staff', Staff)
router.use('/customers', Customer)

module.exports = router