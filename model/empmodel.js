module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("mymaster11", {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:1,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:0,
        }
    })
    return Employee;
}
