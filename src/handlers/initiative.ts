import type { Socket } from 'socket.io'
import type { InitiativeRequestPayload, InitiativeRollPayload } from '../types/payloads'

export function registerInitiativeHandlers(socket: Socket) {
  socket.on('initiative:request', (payload: InitiativeRequestPayload) => {
    socket.to(payload.mesaId).emit('initiative:request', payload)
  })

  socket.on('initiative:roll', (payload: InitiativeRollPayload) => {
    socket.to(payload.mesaId).emit('initiative:roll', payload)
  })
}
