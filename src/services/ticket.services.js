import { ticketRepository } from '../repositories/ticket.repository.js'

export const createTicket = async (ticketData) => {
  const createdTicket = await ticketRepository.createTicket(ticketData)
  return createdTicket
}
