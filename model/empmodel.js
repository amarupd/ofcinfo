module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("employees", {
        fullname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mobile_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateofjoining: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue:1
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue:0
        }
    })
    return Employee;
}
