const empId='10';

const data= (sequelize, DataTypes) => {
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