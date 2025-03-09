const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./infrastructure/database.sqlite",
    logging: false,
});

sequelize
    .authenticate()
    .then(() => console.log("✅ Connected to SQLite using Sequelize"))
    .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = sequelize;
