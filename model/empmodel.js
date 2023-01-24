module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("employees", {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateofjoining: {
            type: DataTypes.DATE,
            allowNull: false,
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
