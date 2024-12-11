const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket',{
	id:{
		type:DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull:false
	},
	show:{
		type: DataTypes.STRING,
		allowNull: false
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	organizer:{
		type: DataTypes.STRING,
		allowNull:false
	},
	sold:{
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
})

module.exports= Ticket;