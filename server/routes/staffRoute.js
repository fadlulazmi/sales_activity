const router = require('express').Router()
const StaffController = require('../controllers/staffController')
const {authentication} = require('../middlewares/middleware')
const upload = require('../helpers/images')

router.post('/register', upload.multer.single('image'), upload.sendUploadToGCS, StaffController.register)
router.post('/login', StaffController.login)

//authenticate
router.use(authentication)

router.get('/', StaffController.findAll)
router.get('/:id', StaffController.findOne)

// authorize
router.put('/:id', upload.multer.single('image'), upload.sendUploadToGCS, StaffController.update)
router.delete('/:id', StaffController.delete)

module.exports = router