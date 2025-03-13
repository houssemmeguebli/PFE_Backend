const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/dataBase");
const User = require("./User");

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
            key: "userId"
        }
    },
    reportTitle: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reportContent: {
        type: DataTypes.STRING,
        allowNull: true
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
    files: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [], // Default to empty array
        get() {
            const value = this.getDataValue("files");
            return value ? (typeof value === "string" ? JSON.parse(value) : value) : [];
        },
        set(value) {
            this.setDataValue("files", value); // Store as-is, Sequelize handles JSON.stringify
        }
    },
    reportStatus: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        allowNull: false,
        defaultValue: "Pending"
    }
});

// Hook to update lastUpdatedAt before update
Report.addHook("beforeUpdate", (report) => {
    report.lastUpdatedAt = new Date();
});

User.hasMany(Report, { foreignKey: "userId" });
Report.belongsTo(User, { foreignKey: "userId" });

module.exports = Report;