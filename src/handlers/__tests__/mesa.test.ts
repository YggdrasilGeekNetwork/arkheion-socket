import { describe, it, expect, vi, beforeEach } from 'vitest'
import { registerMesaHandlers } from '../mesa'

function makeSocket(handlers: Record<string, (...args: unknown[]) => void> = {}) {
  const joinedRooms: string[] = []
  const leftRooms: string[] = []

  return {
    id: 'test-socket-id',
    on: (event: string, fn: (...args: unknown[]) => void) => { handlers[event] = fn },
    join: vi.fn((room: string) => { joinedRooms.push(room) }),
    leave: vi.fn((room: string) => { leftRooms.push(room) }),
    _rooms: { joined: joinedRooms, left: leftRooms },
  }
}

describe('registerMesaHandlers', () => {
  let handlers: Record<string, (...args: unknown[]) => void>
  let socket: ReturnType<typeof makeSocket>

  beforeEach(() => {
    handlers = {}
    socket = makeSocket(handlers)
    registerMesaHandlers(socket as never)
  })

  it('registers mesa:join and mesa:leave handlers', () => {
    expect(handlers['mesa:join']).toBeDefined()
    expect(handlers['mesa:leave']).toBeDefined()
  })

  it('joins the room on mesa:join', () => {
    handlers['mesa:join']('mesa-123')
    expect(socket.join).toHaveBeenCalledWith('mesa-123')
  })

  it('leaves the room on mesa:leave', () => {
    handlers['mesa:leave']('mesa-123')
    expect(socket.leave).toHaveBeenCalledWith('mesa-123')
  })
})
