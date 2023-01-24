const empController = require('../controller/empcontroller')

const router = require('express').Router()


router.get('/getall', empController.getAll)


router.get('/getone', empController.getOne)


router.post('/addemp', empController.addEmp)


router.delete('/delete/:id', empController.deleteEmp)


router.get('/getempsal', empController.getEmpSal)

module.exports = router;