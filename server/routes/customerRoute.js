const router = require('express').Router()
const CustomerController = require('../controllers/customerController')
const upload = require('../helpers/images')

router.post('/', upload.multer.single('image'), upload.sendUploadToGCS, CustomerController.create)

//authenticate
router.get('/', CustomerController.findAll)
router.get('/:id', CustomerController.findOne)

// authorize
router.put('/:id', upload.multer.single('image'), upload.sendUploadToGCS, CustomerController.update)
router.delete('/:id', CustomerController.deleteCustomer)

module.exports = router