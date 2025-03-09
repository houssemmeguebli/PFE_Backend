const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/dataBase");

const User = sequelize.define("User", {
    userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: {type:DataTypes.STRING, allowNull:true},
    departmentName :{type:DataTypes.STRING, allowNull:true},
    address :{type:DataTypes.STRING, allowNull:true},
    password : {type:DataTypes.STRING,allowNull:false},
    dateOfBirth:{type :DataTypes.DATE,allowNull:true},
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
    },
    userStatus: {
        type: DataTypes.ENUM('InActive', 'Active', 'Suspended'),
        allowNull: false,
        defaultValue: 'Active'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
});

module.exports = User;

