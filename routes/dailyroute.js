const dailyController=require('../controller/dailycont')

const drouter=require('express').Router()

drouter.put("/addtime",dailyController.addTimeStamp)

drouter.post("/punchin",dailyController.punchin)

drouter.post("/punchout",dailyController.punchout)

drouter.get("/getdetails",dailyController.details)

module.exports=drouter;