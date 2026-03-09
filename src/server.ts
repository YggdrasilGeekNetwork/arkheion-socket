import { createServer } from 'http'
import { Server } from 'socket.io'
import { registerMesaHandlers } from './handlers/mesa'
import { registerCombatHandlers } from './handlers/combat'
import { registerInitiativeHandlers } from './handlers/initiative'
import { registerCharacterHandlers } from './handlers/character'

const PORT = Number(process.env.PORT ?? 3001)
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173').split(',')

const httpServer = createServer()

export const io = new Server(httpServer, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`[socket] connected: ${socket.id}`)

  registerMesaHandlers(socket)
  registerCombatHandlers(io, socket)
  registerInitiativeHandlers(socket)
  registerCharacterHandlers(socket)

  socket.on('disconnect', () => {
    console.log(`[socket] disconnected: ${socket.id}`)
  })
})

httpServer.listen(PORT, () => {
  console.log(`[socket] Socket.io server running on port ${PORT}`)
})
