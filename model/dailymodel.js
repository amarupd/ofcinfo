module.exports=(sequelize,DataTypes)=>{
    const Punch=sequelize.define("dailyInfo",{
        date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        punchIN:{
            type:Datatypes.TIME,
            allowNull:false
        }
    })
}