const empController = require('../controller/empcontroller')

const router = require('express').Router()


router.get('/getall', empController.getAll)


router.get('/getone', empController.getOne)


router.post('/addemp', empController.addEmp)


router.delete('/delete/:id', empController.deleteEmp)


router.get('/getempsal', empController.getEmpSal)


router.put("/update/:id",empController.updateEmp)

router.put("/submit",empController.submit)

router.put("/submits",empController.submits)

module.exports = router;