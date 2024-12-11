const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vendor = sequelize.define('Vendor',{
     id:{
          type: DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true
     },
     name:{
          type:DataTypes.STRING
     }
})

module.exports = Vendor;