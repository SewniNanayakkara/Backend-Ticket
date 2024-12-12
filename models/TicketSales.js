// Import Sequelize data types
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Import related models
const ticket = require("./Ticket");
const customer = require("./Customer");

// Define TicketSales model
const TicketSales = sequelize.define("TicketSales", {
  // Unique identifier
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Foreign key referencing the Ticket model
  ticket_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ticket,
      key: "id",
    },
  },
  // Foreign key referencing the Customer model
  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: customer,
      key: "id",
    },
  },
  // Timestamp for when the sale was made
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Export TicketSales model
module.exports = TicketSales;