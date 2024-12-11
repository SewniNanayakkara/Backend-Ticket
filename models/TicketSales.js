const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const ticket = require("./Ticket");
const customer = require("./Customer");
const TicketSales = sequelize.define("TicketSales", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	ticket_id: {
		type: DataTypes.INTEGER,
		references: {
			model: ticket,
			key: "id",
		},
	},
	customer_id: {
		type: DataTypes.INTEGER,
		references: {
			model: customer,
			key: "id",
		},
	},
	created_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
});

module.exports = TicketSales;