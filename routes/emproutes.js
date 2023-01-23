const empController = require('../controller/empcontroller')

const router = require('express').Router()


router.get('/getall', empController.getAll)


router.get('/getOne', empController.getOne)


router.get('/addemp', empController.addEmp)


module.exports = router;