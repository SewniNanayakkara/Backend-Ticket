// Import Sequelize data types
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define Vendor model
const Vendor = sequelize.define('Vendor',{
  // Unique identifier
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Vendor name
  name:{
    type: DataTypes.STRING
  }
})

// Export Vendor model
module.exports = Vendor;