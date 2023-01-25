module.exports = (sequelize, DataTypes) => {
    const Punch = sequelize.define("timestamps", {
        empID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
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
            defaultValue: 0
        }
    })
    return Punch;
}