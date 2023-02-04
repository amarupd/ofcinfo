const db = require("../model")
const Timestamp = db.timestamps;
const sequelize = require('../sequelizetemplate')


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
const punchin = async (req, res) => {
    // const id = req.body.id
    let info = {
        date: req.body.date,
        punchIN: sequelize.literal('CURRENT_TIMESTAMP'),
        punchOUT: req.body.punchOUT,
        empID: req.body.empID,
        missed_punch: req.body.missed_punch
    }

    const emp = await Timestamp.create(info)
    // await Timestamp.update({ punchIN: sequelize.literal('CURRENT_TIMESTAMP') })
    res.status(200).send(emp)
}

/********************************************************************************************************************************************** */

const punchout = async (req, res) => {
    const id = req.body.empID
    await Timestamp.update({ punchOUT: sequelize.literal('CURRENT_TIMESTAMP') }, { where: { empID: id } })
    // await Timestamp.update({ total_working_hour: sequelize.query(`SELECT TIMEDIFF(punchOUT, punchIN) from mymaster11.timestamp11s`) }, { where: { empID: id } })
    const punchi = await sequelize.query(`SELECT punchIN FROM timestamps WHERE empID =${id}`,
    {
        type: QueryTypes.SELECT
    });
    const puncho = await sequelize.query(`SELECT punchOUT FROM timestamps WHERE empID =${id}`,
    {
        type: QueryTypes.SELECT
    });
    const punchou = await sequelize.query(`SELECT TIMEDIFF(punchOUT, punchIN) as totaltime FROM timestamps WHERE empID =${id} `,
    {
        type: QueryTypes.SELECT
    });
    res.status(200).send({message:"thank you",data:punchi})
    let mappedArray = punchou.map(item => item.totaltime);
    const str=mappedArray.toString();

    console.log(str);
    
    if (punchi != 'NULL' || puncho != 'NULL') {
        await Timestamp.update({ missed_punch: 0 }, { where: { id: id } })  /// yaha update karna h dimaaag lagao yhi pe date wala karna h
    } else {
        await Timestamp.update({ missed_punch: 1 }, { where: { id: id } }) /// yaha update karna h dimaaag lagao yhi pe date wala karna h
    }
  

    await Timestamp.update({ total_working_hour: str }, { where: { empID: id } })

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const details = async (req, res) => {
    let times = await Timestamp.findAll({})
    res.status(200).send(times)
}



module.exports = {
    punchin,
    punchout,
    details

}