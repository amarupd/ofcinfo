const salController=require('../controller/salarycont')

const srouter=require('express').Router

srouter.get('/getall',salController.getAll)

srouter.get('/getone',salController.getOne)

srouter.put('/addsal',salController.addSal)

srouter.delete('/getall',salController.deleteSal)

module.exports=srouter;