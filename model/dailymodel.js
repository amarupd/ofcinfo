module.exports=(sequelize,DataTypes)=>{
    const Punch=sequelize.define("dailyInfo",{
        date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        punchIN:{
            type:DataTypes.TIME,
            allowNull:false
        },
        punchOUT:{
            type:DataTypes.TIME,
            allowNull:false
        },
        empID:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
    return Punch;
}