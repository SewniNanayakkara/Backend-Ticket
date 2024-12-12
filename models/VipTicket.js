// Import Ticket class
const Ticket = require("./Ticket");

// Define VipTicket class, extending Ticket
class VipTicket extends Ticket {
  // Constructor for VipTicket
  constructor(id, show, price, organizer, exclusive, options) {
    // Call parent class constructor
    super(id, show, price, organizer)
    // Exclusive feature for VipTicket
    this.exclusive = exclusive
    // Additional options for VipTicket
    this.options = options
  }
}

// Export VipTicket class
module.exports = VipTicket;