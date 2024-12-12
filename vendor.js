// Import required modules
const { parentPort } = require("worker_threads");

// Flag to track if the worker is running
var isrunning = true;

// Import configuration
const config = require("./config");

// Handle messages from parent thread
parentPort.on("message", (message) => {
  // Stop the worker
  if (message == "stop") {
    isrunning = false;
  }
});

// Sleep function for the worker thread
async function sleepThread(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Start the ticketing process
async function startTicketing() {
  try {
    // Get the current configuration
    let configuration = config.getConfig();
    console.log(configuration);

    // Run indefinitely until stopped
    while (isrunning) {
      // Generate a random ticket configuration
      let random = Math.floor(Math.random() * 5);
      let ticketConfig = configuration.tickets[random];

      // Create a new ticket
      let ticket = {
        price: ticketConfig.price,
        show: ticketConfig.show,
        organizer: ticketConfig.organizer,
      };

      // Send the ticket to the parent thread
      parentPort.postMessage({ action: "ticketAdd", ticket });

      // Wait for the ticket release rate
      await sleepThread(configuration.ticketReleaseRate);
    }
  } catch (e) {
    console.log("Error in Ticket Releasing", e);
  }
}

// Start the ticketing process
startTicketing();