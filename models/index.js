const ticket = require('./Ticket')
const customer = require('./Customer')
const vendor = require('./Vendor')
const ticketSales = require('./TicketSales')
const configuration = require("./Ticket");
ticket.hasMany(ticketSales,{foreignKey:'ticket_id'})
ticketSales.belongsTo(ticket,{foreignKey:'ticket_id'})
customer.hasMany(ticketSales,{foreignKey:'customer_id'})
ticketSales.belongsTo(customer,{foreignKey:'customer_id'})

module.exports = {
  ticket,
  customer,vendor,ticketSales,configuration
}