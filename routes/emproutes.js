const empController = require('../controller/empcontroller')

const salController=require('../controller/salarycont')

const router = require('express').Router()


router.get('/employee/getall', empController.getAll)


router.get('/employee/getone', empController.getOne)


router.put('/employee/addemp', empController.addEmp)


router.delete('/employee/delete/:id', empController.deleteEmp)






router.get('/getall',salController.getAll)

router.get('/getone',salController.getOne)

router.post('/addsal',salController.addSal)

router.delete('/getall',salController.deleteSal)






module.exports = router;