const { Sequelize, DataTypes } = require('sequelize')


const dbConfig = require('./config/dbConfig')
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
sequelize.authenticate()
    .then(() => {
        console.log("database is connected");
    })
    .catch((err) => {
        console.log("error :-" + err);
    })


const empId = '10';

const data = (sequelize, DataTypes) => {
    const Punch = sequelize.define(`emp${empId}s`, {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: new Date()
        },
        punchIN: {
            type: DataTypes.TIME,
            allowNull: true
        },
        punchOUT: {
            type: DataTypes.TIME,
            allowNull: true
        },
        missed_punch: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        timestamps: false
    })
    return Punch;
}


const db = data
db.Sequelize = Sequelize
db.sequelize = sequelize


db.sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync done');
    })