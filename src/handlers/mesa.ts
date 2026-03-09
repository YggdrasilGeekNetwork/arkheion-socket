import type { Socket } from 'socket.io'

export function registerMesaHandlers(socket: Socket) {
  socket.on('mesa:join', (mesaId: string) => {
    socket.join(mesaId)
    console.log(`[socket] ${socket.id} joined mesa ${mesaId}`)
  })

  socket.on('mesa:leave', (mesaId: string) => {
    socket.leave(mesaId)
    console.log(`[socket] ${socket.id} left mesa ${mesaId}`)
  })
}
