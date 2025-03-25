import { ticketDAO } from '../dao/index.js'

class TicketRepository {
  async getAllTickets() {
    return await ticketDAO.getAll()
  }

  async getTicketById(id) {
    return await ticketDAO.getById(id)
  }

  async createTicket(data) {
    return await ticketDAO.create(data)
  }

  async updateTicket(id, data) {
    return await ticketDAO.update(id, data)
  }

  async deleteTicket(id) {
    return await ticketDAO.delete(id)
  }
}

export const ticketRepository = new TicketRepository()
