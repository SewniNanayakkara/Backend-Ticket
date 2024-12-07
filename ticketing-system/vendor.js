const { parentPort } = require("worker_threads");
const config = require("./config");
const Ticket = require("./models/Ticket");

let isRunning = true;

parentPort.on("message", (message) => {
	if (message === "stop") {
		isRunning = false;
	}
});

async function start() {
	while (isRunning) {
		const randomNumber = Math.floor(Math.random() * 5);
		const ticketData = config.getConfig().tickets[randomNumber];
		const ticket = new Ticket(ticketData.id, ticketData.price, ticketData.show, ticketData.organizer);

		// Send ticket to the main thread
		parentPort.postMessage({ action: "addTicket", ticket });

		await sleep(config.getConfig().ticketReleaseRate);
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

start();
