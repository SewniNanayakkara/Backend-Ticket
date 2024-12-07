// ticket.js
const { Mutex } = require("async-mutex");
const config = require("./config");
const queue = require("js-priority-queue");
const mutex = new Mutex();
const pool = [];
const customerQueue = new queue({ comparator: (a, b) => b.priority - a.priority });

async function ticketAdd(ticket) {
	const release = await mutex.acquire();
	try {
		if (pool.length < config.getConfig().maxTicketCapacity) {
			pool.push(ticket);
			console.log(`Ticket ${ticket.id} added to the pool. Pool size is now ${pool.length}`);
			return true;
		} else {
			console.log("Ticket pool is full now");
			return false;
		}
	} finally {
		release();
	}
}

async function buyTicket(priority) {
	const release = await mutex.acquire();
	try {
		customerQueue.queue({ priority });
		if (pool.length > 0) {
			const nextCustomer = customerQueue.peek();
			if (nextCustomer.priority === priority) {
				customerQueue.dequeue();
				const ticket = pool.shift();
				console.log(`Ticket ID: ${ticket.id} purchased by customer with priority: ${priority}`);
				return ticket;
			}
		}
		console.log(`Customer with priority: ${priority} - No tickets available for purchase.`);
		return null;
	} finally {
		release();
	}
}

function getPoolSize() {
	return pool.length;
}

function getTickets() {
	return pool;
}

module.exports = { ticketAdd, buyTicket, getPoolSize, getTickets };
