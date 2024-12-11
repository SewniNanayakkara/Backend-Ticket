const { Sequelize } = require("sequelize");

var sequelize = new Sequelize({
     dialect:'sqlite',
     storage:'database.sqlite',
     logging:true
})

module.exports = sequelize;