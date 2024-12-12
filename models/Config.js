// Import Sequelize data types
const { DataTypes } = require("sequelize");

// Import database configuration
const sequelize = require("../config/database");

// Define Config model
const configuration = sequelize.define("Config", {
  // Unique identifier
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // Configuration value
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});