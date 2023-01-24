const empController = require('../controller/empcontroller')

const router = require('express').Router()


router.get('/getall', empController.getAll)


router.get('/getone', empController.getOne)


router.put('/addemp', empController.addEmp)


router.delete('/delete/:id', empController.deleteEmp)


module.exports = router;