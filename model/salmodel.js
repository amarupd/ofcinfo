module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("salaries", {
        salary: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        empID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    return Employee;
}