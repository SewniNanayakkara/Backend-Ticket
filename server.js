// server.js
const express = require("express");
const http = require("http");
const { Worker } = require("worker_threads");
const socketIo = require("socket.io");
const config = require("./config");
const { getPoolSize,buyTicket,ticketAdd } = require("./ticket");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

let vendors = [];
let customers = [];
let customerWorkers = new Map();
app.use(express.json());
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:3001", // Allow your frontend's origin
		methods: ["GET", "POST"],
		credentials: true,
	},
});
// Configure CORS options
const corsOptions = {
  origin: "http://localhost:3001", // Allow your frontend's origin
  methods: ["GET", "POST"],
  credentials: true,
};

// Use the CORS middleware with options
app.use(cors(corsOptions));
// API endpoint to set configuration
app.post("/config", (req, res) => {
	config.setConfig(req.body);
	res.send("Configuration updated.");
});

// API endpoint to start the system
app.post("/start", (req, res) => {
	startSystem();
	res.send("System started.");
});

// API endpoint to stop the system
app.post("/stop", (req, res) => {
	stopSystem();
	res.send("System stopped.");
});


// Create a new customer
app.post('/customers', async (req, res) => {
  try {
    const { priority } = req.body;
    const customerId = generateUniqueId();
    const customerData = { id: customerId, priority };
    startCustomer(customerData);
    res.status(201).json(customerData);
  } catch (error) {
    console.log(`Error creating customer: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Stop a customer
app.delete('/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    stopCustomer(customerId);
    res.json({ message: 'Customer stopped.' });
  } catch (error) {
    console.log(`Error deleting customer: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start customer worker
function startCustomer(customerData) {
  const customerWorker = new Worker('./customer.js', {
    workerData: { priority: customerData.priority },
  });
  customerWorkers.set(customerData.id, customerWorker);
  console.log(`Customer ${customerData.id} started.`);
}

// Stop customer worker
function stopCustomer(customerId) {
  const worker = customerWorkers.get(customerId);
  if (worker) {
    worker.postMessage('stop');
    customerWorkers.delete(customerId);
    console.log(`Customer ${customerId} stopped.`);
  }
}

// Generate a unique ID for customers
function generateUniqueId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function startSystem() {
	// Start vendors
	const vendorWorker = new Worker("./vendor.js");
	vendors.push(vendorWorker);

	vendorWorker.on("message", async (message) => {
		if (message.action === "addTicket") {
			await ticketAdd(message.ticket);
			console.log("Ticket released");
		}
	});

	// Start customers
	const customerWorker = new Worker("./customer.js", {
		workerData: { priority: 0 },
	});
	customers.push(customerWorker);

	customerWorker.on("message", async (message) => {
		if (message.action === "buyTicket") {
			const ticket = await buyTicket(message.priority);
			if (ticket) {
				customerWorker.postMessage({ action: "ticketPurchased", ticket });
			} else {
				customerWorker.postMessage({ action: "noTicket" });
			}
		}
	});

	console.log("System started.");
}

function stopSystem() {
	// Stop vendors
	vendors.forEach((worker) => worker.postMessage("stop"));
	vendors = [];

	// Stop customers
	customers.forEach((worker) => worker.postMessage("stop"));
	customers = [];

	console.log("System stopped.");
}

io.on("connection", (socket) => {
	console.log("Socket Connected");

	const intervalId = setInterval(() => {
		socket.emit("update", { ticketCount: getPoolSize() });
	}, 1000);

	socket.on("disconnect", () => {
		clearInterval(intervalId);
		console.log("Socket disconnected.");
	});
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});