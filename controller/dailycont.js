const db=require("../model")
const Timestamp = db.timestamps;
const dbConfig = require('../config/dbconfig')
const Sequelize=require('sequelize')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})


const { QueryTypes } = require('sequelize');

const redis = require("redis");
// const { Sequelize } = require("../model");
// const redisPort = "redis://127.0.0.1:6379"
const redisPort = "redis://default:ovDFb4qIVC7PoaIdIDlsaE4ymM97Aaf3@redis-12561.c264.ap-south-1-1.ec2.cloud.redislabs.com:12561"
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})

/********************************************************************************************** */

const addTimeStamp=async(req,res)=>{
    let info = {
        date: req.body.date,
        punchIN: req.body.punchIN,
        punchOUT: req.body.punchOUT,
        empID: req.body.empID,
        missed_punch: req.body.missed_punch
    }
    
    const emp = await Timestamp.create(info)
    res.status(200).send(emp)
}
//sequelize.literal('CURRENT_TIMESTAMP)

const punchin=async(req,res)=>{
    const id = req.body.id
    await Timestamp.update({punchIN : sequelize.literal('CURRENT_TIMESTAMP') },{where: { empID: id }})
    res.status(200).send("thank you")
}


const punchout=async(req,res)=>{
    const id = req.body.id
    await Timestamp.update({punchOUT : sequelize.literal('CURRENT_TIMESTAMP') },{where: { empID: id }})
    res.status(200).send("thank you")
    let punchi=await sequelize.query('SELECT punchIN FROM timestamps WHERE empID =:id',
        {
            replacements: { id: id },
            type: QueryTypes.SELECT
          }
      );
      let puncho=await sequelize.query('SELECT punchOUT FROM timestamps WHERE empID =:id',
        {
            replacements: { id: id },
            type: QueryTypes.SELECT
          }
      );
   // let punchi = await Timestamp.findOne({ where: { id: id } })
    // let puncho = await Timestamp.findOne({ where: { id: id } })
    if(punchi !='NULL' || puncho!= 'NULL'){
        await Timestamp.update({ missed_punch: 0}, {where: {id: id}})  /// yaha update karna h dimaaag lagao
     } else {
        await Timestamp.update({ missed_punch: 1}, {where: {id: id}}) /// yaha update karna h dimaaag lagao
     }
     
}

const details=async(req,res)=>{
    let times=await Timestamp.findAll({})
    res.status(200).send(times)
}



module.exports={
    addTimeStamp,
    punchin,
    punchout,
    details

}