const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/dataBase");
const User = require("./User");

const Script = sequelize.define("Script", {
    scriptId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    },
    scriptName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    scriptContent: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    lastUpdatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
});

Script.addHook('beforeUpdate', (script, options) => {
    script.lastUpdatedAt = new Date();
});

User.hasMany(Script, { foreignKey: 'userId' });
Script.belongsTo(User, { foreignKey: 'userId' });

module.exports = Script;
