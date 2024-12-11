const { parentPort, workerData } = require("worker_threads");
const config = require("./config");
let isRunning = true;
const priority = workerData.priority || 0;

parentPort.on("message", (message) => {
	if (message === "stop") {
		isRunning = false;
	} else if (message.action === "ticketPurchased") {
		const ticket = message.ticket;
		console.log(`Customer with priority: ${priority} purchased a ticket: ${ticket.id}`);
	} else if (message.action === "noTicket") {
		console.log(`Customer with priority: ${priority} - No tickets available for purchase.`);
	}
});

async function start() {
	while (isRunning) {
		// Request to buy a ticket
		parentPort.postMessage({ action: "buyTicket", priority });
		await sleep(config.getConfig().customerRetrievalRate);
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

start();
