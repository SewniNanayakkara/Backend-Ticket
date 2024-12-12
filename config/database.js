// Import Sequelize library
const { Sequelize } = require("sequelize");

// Create a new Sequelize instance
var sequelize = new Sequelize({
  // Database dialect
  dialect: 'sqlite',
  // Database storage file
  storage: 'database.sqlite',
  // Enable logging
  logging: true
})

// Export the Sequelize instance
module.exports = sequelize;