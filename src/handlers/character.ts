import type { Socket } from 'socket.io'
import type {
  CharacterConditionsPayload,
  CharacterActionPayload,
  CharacterInitiativePayload,
  CharacterHealthPayload,
  CharacterUpdatePayload,
} from '../types/payloads'

export function registerCharacterHandlers(socket: Socket) {
  socket.on('character:conditions:update', (payload: CharacterConditionsPayload) => {
    socket.to(payload.mesaId).emit('character:conditions:update', payload)
  })

  socket.on('character:action:update', (payload: CharacterActionPayload) => {
    socket.to(payload.mesaId).emit('character:action:update', payload)
  })

  socket.on('character:initiative:update', (payload: CharacterInitiativePayload) => {
    socket.to(payload.mesaId).emit('character:initiative:update', payload)
  })

  socket.on('character:health:update', (payload: CharacterHealthPayload) => {
    socket.to(payload.mesaId).emit('character:health:update', payload)
  })

  socket.on('character:update', (payload: CharacterUpdatePayload) => {
    socket.to(payload.mesaId).emit('character:update', payload)
  })
}
