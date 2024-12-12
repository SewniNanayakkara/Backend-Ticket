// Import models
const Ticket = require('./Ticket')
const Customer = require('./Customer')
const Vendor = require('./Vendor')
const TicketSales = require('./TicketSales')
const Configuration = require("./Ticket");

// Define relationships
// A ticket can have many sales
Ticket.hasMany(TicketSales, { foreignKey: "ticket_id" });
// A sale belongs to a ticket
TicketSales.belongsTo(Ticket, { foreignKey: "ticket_id" });
// A customer can have many sales
Customer.hasMany(TicketSales, { foreignKey: "customer_id" });
// A sale belongs to a customer
TicketSales.belongsTo(Customer, { foreignKey: "customer_id" });

// Export models
module.exports = {
  Ticket,
  Customer,
  Vendor,
  TicketSales,
  Configuration,
};