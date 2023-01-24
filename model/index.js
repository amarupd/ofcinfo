const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require('../config/dbconfig')
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
}
)
sequelize.authenticate()
    .then(() => {
        console.log("database is connected");
    })
    .catch((err) => {
        console.log("error :-" + err);
    })



const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.employees = require('./empmodel')(sequelize, DataTypes)

db.salaries=require('./salmodel')(sequelize,DataTypes)


db.sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync done');
    })
db.employees.hasOne(db.salaries,{
    foreignKey: 'salID',
    as:'salary'
})
db.salaries.belongsTo(db.employees,{
    foreignKey:'salID',
    as:'empID'
})


module.exports = db