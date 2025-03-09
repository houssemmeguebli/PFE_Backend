const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/dataBase");
const User = require("./User"); // Import the User model

const Report = sequelize.define("Report", {
    reportId: {
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
    reportContent: {
        type: DataTypes.STRING,
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
    },
    reportStatus: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        allowNull: false,
        defaultValue: 'Pending'
    }
});

Report.addHook('beforeUpdate', (report, options) => {
    report.lastUpdatedAt = new Date(); // Set `lastUpdatedAt` to current time
});

User.hasMany(Report, { foreignKey: 'userId' });
Report.belongsTo(User, { foreignKey: 'userId' });

module.exports = Report;
