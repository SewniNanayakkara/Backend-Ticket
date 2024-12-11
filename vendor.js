const{parentPort} = require("worker_threads")
var isrunning = true;
const config = require("./config");
parentPort.on("message",(message) =>{
	if(message=="stop") {
		isrunning=false
	}
})

async function sleepThread(ms){
	return new Promise((resolve) => setTimeout(resolve,ms))
}


async function startTicketing(){
	try{
		let configuration = config.getConfig()
		console.log(configuration)
		while(isrunning){
			let random = Math.floor(Math.random() * 5)
			let ticketConfig = configuration.tickets[random]
			let ticket = {price:ticketConfig.price, show:ticketConfig.show,organizer:ticketConfig.organizer}
			parentPort.postMessage({action:"ticketAdd",ticket})
			await sleepThread(configuration.ticketReleaseRate)
		}
	}catch(e){
		console.log("Error in Ticket Releasing", e)
	}

}

startTicketing()