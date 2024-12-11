let configuration = {
	totalTickets: 1000,
	ticketReleaseRate: 2000,
	customerRetrievalRate: 1500,
	maxTicketCapacity: 100,
	tickets: [
		{ id: 1, show: "test", price: 1000, organizer: "IIT" },
		{ id: 2, show: "test2", price: 2000, organizer: "IIT" },
		{ id: 3, show: "test3", price: 1500, organizer: "IIT" },
		{ id: 4, show: "test4", price: 3000, organizer: "IIT" },
		{ id: 5, show: "test5", price: 5000, organizer: "IIT" },
	],
}

function setConfig(newConfig) {
	configuration = { ...configuration, ...newConfig };
}

function getConfig() {
	return configuration;
}

module.exports = { setConfig, getConfig };
