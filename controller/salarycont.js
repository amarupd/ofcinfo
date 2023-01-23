const db=require("../model")
const Salary = db.mymaster11;
const redis = require("redis");
const redisPort = "redis://127.0.0.1:6379"
// const redisPort = "redis://default:ovDFb4qIVC7PoaIdIDlsaE4ymM97Aaf3@redis-12561.c264.ap-south-1-1.ec2.cloud.redislabs.com:12561"
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})
//***************************************************************************************************************************** */

const getAll = async (req, res) => {
    // const id = req.query.id
    try {
        client.get('api',async (err, Salarys) => {
            if (err) throw err;
            if (Salarys) {
                console.log("catched from redis");
                res.status(200).send(JSON.parse(Salarys));
            }
            else {
                let Salarys = await Salary.findAll({})
                client.setex('api',600, JSON.stringify(Salarys));
                res.status(200).send(Salarys);
                console.log("fetched from mysql")
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}

//********************************************************************************************************************************** */


const getOne = async (req, res) => {
    const id = req.query.id
    try {
        client.get(id, async (err, Salary) => {
            if (err) throw err;
            if (Salary) {
                console.log("catched from redis");
                res.status(200).send(JSON.parse(Salary));
            }
            else {
                let Salary = await Salary.findOne({ where: { id: id } })
                client.setex(id, 600, JSON.stringify(Salary));
                res.status(200).send(Salary);
                console.log("fetched from mysql")
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}


//**************************************************************************************************************************

const addEmp=async(req,res)=>{
    let info = {
        salary: req.body.salary,
        empID: req.body.empID
    }
    const emp = await Salary.create(info)
    res.status(200).send(emp)
}

/****************************************************************************************************************************** */

const deleteEmp=async(req,res)=>{
    const id = req.params.id
    await Salary.update({is_deleted:1,status:0},{where: { id: id }})
    res.status(200).send("Salary is deleted")
}




module.exports = {
    getAll,
    getOne,
    addEmp,
    deleteEmp
}