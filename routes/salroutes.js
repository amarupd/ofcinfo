const salController=require('../controller/salarycont')

const srouter=require('express').Router()

srouter.get('/getall',salController.getAll)

srouter.get('/getone',salController.getOne)

srouter.post('/addsal',salController.addSal)

srouter.delete('/delete:id',salController.deleteSal)

module.exports=srouter;