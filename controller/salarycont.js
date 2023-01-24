const db=require("../model")
const Salary = db.salaries;
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
        client.get('api',async (err, salaries) => {
            if (err) throw err;
            if (salaries) {
                console.log("catched from redis");
                res.status(200).send(JSON.parse(salaries));
            }
            else {
                let salaries = await Salary.findAll({})
                client.setex('api',600, JSON.stringify(salaries));
                res.status(200).send(salaries);
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
        client.get(id, async (err, salary) => {
            if (err) throw err;
            if (salary) {
                console.log("catched from redis");
                res.status(200).send(JSON.parse(salary));
            }
            else {
                let salary = await Salary.findOne({ where: { id: id } })
                client.setex(id, 600, JSON.stringify(salary));
                res.status(200).send(salary);
                console.log("fetched from mysql")
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}


//**************************************************************************************************************************

const addSal=async(req,res)=>{
    let info = {
        salary: req.body.salary,
        empID: req.body.empID
    }
    const sal = await Salary.create(info)
    res.status(200).send(sal)
}

/****************************************************************************************************************************** */

const deleteSal=async(req,res)=>{
    const id = req.params.id
    await Salary.update({is_deleted:1,status:0},{where: { id: id }})
    res.status(200).send("Salary is deleted")
}




module.exports = {
    getAll,
    getOne,
    addSal,
    deleteSal
}