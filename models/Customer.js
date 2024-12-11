const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Customer = sequelize.define("Customer", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	priority: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	ticket_bought: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Customer;