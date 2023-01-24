const empController = require('../controller/empcontroller')

const router = require('express').Router()


router.get('/employee/getall', empController.getAll)


router.get('/employee/getone', empController.getOne)


router.post('/employee/addemp', empController.addEmp)


router.delete('/employee/delete/:id', empController.deleteEmp)



module.exports = router;