import type { Server, Socket } from 'socket.io'
import type {
  CombatStartPayload,
  CombatEndPayload,
  TurnChangePayload,
  TurnEndPayload,
  CombatSyncRequestPayload,
} from '../types/payloads'

export function registerCombatHandlers(io: Server, socket: Socket) {
  socket.on('combat:start', (payload: CombatStartPayload) => {
    socket.to(payload.mesaId).emit('combat:start', payload)
  })

  socket.on('combat:end', (payload: CombatEndPayload) => {
    socket.to(payload.mesaId).emit('combat:end', payload)
  })

  socket.on('turn:change', (payload: TurnChangePayload) => {
    socket.to(payload.mesaId).emit('turn:change', payload)
  })

  socket.on('turn:end', (payload: TurnEndPayload) => {
    socket.to(payload.mesaId).emit('turn:end', payload)
  })

  socket.on('combat:sync:request', (payload: CombatSyncRequestPayload) => {
    socket.to(payload.mesaId).emit('combat:sync:request', payload)
  })
}
