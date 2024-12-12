// Import Sequelize data types
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define Ticket model
const Ticket = sequelize.define('Ticket',{
  // Unique identifier
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  // Show name
  show:{
    type: DataTypes.STRING,
    allowNull: false
  },
  // Ticket price
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  // Event organizer
  organizer:{
    type: DataTypes.STRING,
    allowNull: false
  },
  // Whether the ticket is sold
  sold:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

// Export Ticket model
module.exports = Ticket;