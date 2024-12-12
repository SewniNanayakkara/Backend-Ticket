// Import required modules
const { Mutex } = require("async-mutex");
const config = require("./config");
const Queue = require("js-priority-queue");
const Ticket = require("./models/Ticket");
const TicketSales = require("./models/TicketSales");
const Customer = require("./models/Customer");

// Initialize mutex and queue
let mutex = new Mutex();
let customerQueue = new Queue({ comparator: (a, b) => b.priority - a.priority });

// Add ticket to pool
async function ticketAdd(ticket) {
  // Acquire mutex lock
  let release = await mutex.acquire();
  try {
    // Add ticket to pool if not full
    let configuration = config.getConfig();
    let unsold = await Ticket.count({ where: { sold: false } });
    if (unsold < configuration.maxTicketCapacity) {
      let newticket = await Ticket.create(ticket);
      console.log(`Ticket ${newticket.id} added.`);
      return true;
    } else {
      console.log("Ticket Pool Full");
      return false;
    }
  } catch (e) {
    console.log("Error in Ticket Pool", e);
    return false;
  } finally {
    // Release mutex lock
    release();
  }
}

// Buy ticket
async function ticketBuy(customer_id, priority) {
  // Acquire mutex lock
  let release = await mutex.acquire();
  try {
    // Add customer to queue
    customerQueue.queue({ customerId: customer_id, priority: priority });
    let nextcust = customerQueue.peek();
    if (nextcust.customerId == customer_id) {
      // Buy ticket if available
      let ticket = await Ticket.findOne({ where: { sold: false } });
      if (ticket) {
        ticket.sold = true;
        await ticket.save();
        // Update customer and ticket sales
        let customer = await Customer.findByPk(customer_id);
        if (!customer) {
          customer = await Customer.create({ id: customer_id, priority: priority });
        }
        await TicketSales.create({
          ticket_id: ticket.id,
          customer_id: customer.id,
        });
        customerQueue.dequeue();
        customer.ticket_bought = true;
        customer.save();
        console.log(`Ticket id ${ticket.id} sold.`);
        return ticket;
      } else {
        console.log("No Ticket Available");
        return null;
      }
    } else {
      console.log(`Customer Waiting ${customer_id}`);
    }
  } catch (e) {
    console.log("Error in buying ticket ", e);
    return null;
  } finally {
    // Release mutex lock
    release();
  }
}

// Get pool size
async function getPoolSize() {
  let size = await Ticket.count({ where: { sold: false } });
  return size;
}

// Get tickets
async function getTickets() {
  let tickets = await Ticket.findAll({ where: { sold: false } });
  return tickets;
}

// Export functions
module.exports = { ticketAdd, ticketBuy, getPoolSize, getTickets };
