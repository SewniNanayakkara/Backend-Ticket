const { parentPort, workerData } = require("worker_threads");
const config = require("./config");
let isrunning = true
const priority = workerData.priority || 0

parentPort.on("message", (message) => {
	if (message === "stop") {
		isrunning = false
	} else if (message.action === "ticketPurchased") {
		const ticket = message.ticket
		console.log(`Customer with priority: ${priority} bought ticket: ${ticket.id}`)
	} else if (message.action === "noTicket") {
		console.log(`Customer with priority: ${priority} - No tickets available.`)
	}
})

async function start() {
	try{
	while (isrunning) {
		parentPort.postMessage({ action: "buyTicket", priority })
		let configuration = config.getConfig()
		await sleep(configuration.customerRetrievalRate)
	}
	}catch(e){
		console.log("error in buying ticket", e)
	}

}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

start()
