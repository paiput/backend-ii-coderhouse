import MongoDAO from './mongo.dao.js'
import { Ticket } from './models/ticketModel.js'

export default class TicketDAO extends MongoDAO {
  constructor() {
    super(Ticket)
  }
}
