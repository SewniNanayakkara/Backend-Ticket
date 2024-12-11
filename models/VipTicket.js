const Ticket = require("./Ticket");

class VipTicket extends Ticket {
	constructor(id, show, price, organizer, exclusive,options) {
		super(id, price, show, organizer)
		this.exclusive = exclusive
          this.options = options
	}
}

module.exports = VipTicket
