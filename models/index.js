const Ticket = require('./Ticket')
const Customer = require('./Customer')
const Vendor = require('./Vendor')
const TicketSales = require('./TicketSales')
const Configuration = require("./Ticket");
Ticket.hasMany(TicketSales, { foreignKey: "ticket_id" });
TicketSales.belongsTo(Ticket, { foreignKey: "ticket_id" });
Customer.hasMany(TicketSales, { foreignKey: "customer_id" });
TicketSales.belongsTo(Customer, { foreignKey: "customer_id" });

module.exports = {
	Ticket,
	Customer,
	Vendor,
	TicketSales,
	Configuration,
};