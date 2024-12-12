// Import required modules
const { parentPort, workerData } = require("worker_threads");
const config = require("./config");

// Initialize variables
let isrunning = true;
const priority = workerData.priority || 0;

// Handle messages from parent thread
parentPort.on("message", (message) => {
  if (message === "stop") {
    isrunning = false;
  } else if (message.action === "ticketPurchased") {
    console.log(`Customer with priority: ${priority} bought ticket: ${message.ticket.id}`);
  } else if (message.action === "noTicket") {
    console.log(`Customer with priority: ${priority} - No tickets available.`);
  }
});

// Start buying tickets
async function start() {
  try {
    while (isrunning) {
      // Request to buy ticket
      parentPort.postMessage({ action: "buyTicket", priority });
      // Wait for customer retrieval rate
      await sleep(config.getConfig().customerRetrievalRate);
    }
  } catch (e) {
    console.log("Error in buying ticket", e);
  }
}

// Sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Start the process
start()
