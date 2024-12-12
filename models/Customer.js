// Import Sequelize data types
const { DataTypes } = require("sequelize");

// Import database configuration
const sequelize = require("../config/database");

// Define Customer model
const Customer = sequelize.define("Customer", {
  // Unique identifier
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // Customer priority level
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  // Customer purchased ticket
  ticket_bought: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Export the Customer model
module.exports = Customer;