const db=require("../model")
// const sal=require("../controller/salarycont")
const Employee = db.employees;
const Salary = db.salaries;
const Punch=db.timestamps;
const redis = require("redis");
// const redisPort = "redis://127.0.0.1:6379"
const redisPort = "redis://default:ovDFb4qIVC7PoaIdIDlsaE4ymM97Aaf3@redis-12561.c264.ap-south-1-1.ec2.cloud.redislabs.com:12561"
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})
const sequelize=require('../sequelizetemplate')

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
    await Employee.update({is_deleted:1,status:0,dateofresigning:sequelize.literal('CURRENT_TIMESTAMP')},{where: { id: id }})
    res.status(200).send("employee is deleted")
}

const getEmpSal=async(req,res)=>{
    const data=await Employee.findAll({
        include:[{
            model:Salary,
            as:'salaries'
        },
        {
            model:Punch,
            as:'timestamps'
        }]
    })
    res.status(200).send(data)
}

const updateEmp = async (req, res) => {
    let Id = req.params.id;
    const product = await Employee.update(req.body, { where: { id: Id } })
    res.status(200).send("results updated succesfully");
}




const submit=async(req,res)=>{
    let Id = req.body.id;
    if(Id=='NULL' || Id==0){
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
    else{
        const product = await Employee.update(req.body, { where: { id: Id } })
        res.status(200).send("results updated succesfully");
    }
}



//operATion


const submits=async(req,res)=>{
    let Id = req.body.op;
    switch (Id) {
        case '0':
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
            break;
        
        case '1':
            let Iid = req.body.id;
            const product = await Employee.update(req.body, { where: { id: Iid } })
            res.status(200).send("results updated succesfully");
            break;

        case '2':
            let id = req.body.id;
            await Employee.update({is_deleted:1,status:0},{where: { id: id }})
            res.status(200).send("employee is deleted")
            break;
        default:
            res.send("0 for add employee, 1 for update, 2 for delete").status(400)
            break;
    }
}





module.exports = {
    getAll,
    getOne,
    addEmp,
    deleteEmp,
    getEmpSal,
    updateEmp,
    submit,
    submits
}