module.exports = (sequelize, DataTypes) => {
    const Salary = sequelize.define("salaries", {
        salary: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        empID: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: false
    })
    return Salary;
}