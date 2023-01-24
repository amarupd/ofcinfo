module.exports = (sequelize, DataTypes) => {
    const Salary = sequelize.define("salaries", {
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
    return Salary;
}