const dailyController=require('../controller/dailycont')

const drouter=require('express').Router()

drouter.put("/addtime",dailyController.addTimeStamp)

drouter.post("/punchin:id",dailyController.punchin)

drouter.post("/punchout/:id",dailyController.punchout)

drouter.get("/getdetails",dailyController.details)

module.exports=drouter;