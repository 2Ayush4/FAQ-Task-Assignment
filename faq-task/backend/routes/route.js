const express = require('express')

const router = express.Router()

const myController = require('../controller/tracker')

router.post('/register', myController.register)
router.get('/verify/:uniquestring/:action', myController.verifyUser)

router.post('/login', myController.login)

router.post('/requestresetpassword', myController.resetPasswordRequestController)
router.post('/resetpassword', myController.resetPasswordController)

router.post('/update', myController.update)
router.get('/users', myController.getUsers)

module.exports = router;