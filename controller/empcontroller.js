const db=require("../model")
// const sal=require("../controller/salarycont")
const Employee = db.employees;
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
        client.get('eapi',async (err, employees) => {
            if (err) throw err;
            if (employees) {
                console.log("catched from redis");
                res.status(200).send(JSON.parse(employees));
            }
            else {
                let employees = await Employee.findAll({})
                client.setex('eapi',600, JSON.stringify(employees));
                res.status(200).send(employees);
                console.log("fetched from mysql")
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}

//********************************************************************************************************************************** */


const getOne = async (req, res) => {
    const eid = req.query.id
    try {
        client.get(eid, async (err, employee) => {
            if (err) throw err;
            if (employee) {
                console.log("catched from redis");
                res.status(200).send(JSON.parse(employee));
            }
            else {
                let employee = await Employee.findOne({ where: { id: eid } })
                client.setex(eid, 600, JSON.stringify(employee));
                res.status(200).send(employee);
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
        fullname: req.body.fullname,
        email: req.body.email,
        mobile_number: req.body.mobile_number,
        designation: req.body.designation,
        status: req.body.status,
        is_deleted: req.body.is_deleted
    }
    
    const emp = await Employee.create(info)
    res.status(200).send(emp)
}

/****************************************************************************************************************************** */

const deleteEmp=async(req,res)=>{
    const id = req.params.id
    await Employee.update({is_deleted:1,status:0},{where: { id: id }})
    res.status(200).send("employee is deleted")
}

const getEmpSal=async(req,res)=>{
    const data=await Employee.findAll({
        include:[{
            model:Salary,
            as:'salaries'
        }]
    })
    res.status(200).send(data)
}


module.exports = {
    getAll,
    getOne,
    addEmp,
    deleteEmp,
    getEmpSal
}