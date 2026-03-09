import { describe, it, expect, vi, beforeEach } from 'vitest'
import { registerCombatHandlers } from '../combat'

function makeSocket(handlers: Record<string, (...args: unknown[]) => void> = {}) {
  const toEmits: Array<{ room: string; event: string; payload: unknown }> = []

  const toProxy = (room: string) => ({
    emit: (event: string, payload: unknown) => { toEmits.push({ room, event, payload }) },
  })

  return {
    id: 'test-socket-id',
    on: (event: string, fn: (...args: unknown[]) => void) => { handlers[event] = fn },
    to: vi.fn((room: string) => toProxy(room)),
    _emits: toEmits,
  }
}

const fakeIo = {} as never

describe('registerCombatHandlers', () => {
  let handlers: Record<string, (...args: unknown[]) => void>
  let socket: ReturnType<typeof makeSocket>

  beforeEach(() => {
    handlers = {}
    socket = makeSocket(handlers)
    registerCombatHandlers(fakeIo, socket as never)
  })

  it('relays combat:start to the mesa room', () => {
    const payload = { mesaId: 'mesa-42', initiativeOrder: [] }
    handlers['combat:start'](payload)
    expect(socket.to).toHaveBeenCalledWith('mesa-42')
    expect(socket._emits).toContainEqual({ room: 'mesa-42', event: 'combat:start', payload })
  })

  it('relays combat:end to the mesa room', () => {
    const payload = { mesaId: 'mesa-42' }
    handlers['combat:end'](payload)
    expect(socket._emits).toContainEqual({ room: 'mesa-42', event: 'combat:end', payload })
  })

  it('relays turn:change to the mesa room', () => {
    const payload = { mesaId: 'mesa-42', characterId: 'char-1', round: 2 }
    handlers['turn:change'](payload)
    expect(socket._emits).toContainEqual({ room: 'mesa-42', event: 'turn:change', payload })
  })

  it('relays turn:end to the mesa room', () => {
    const payload = { mesaId: 'mesa-42', characterId: 'char-1' }
    handlers['turn:end'](payload)
    expect(socket._emits).toContainEqual({ room: 'mesa-42', event: 'turn:end', payload })
  })

  it('relays combat:sync:request to the mesa room', () => {
    const payload = { mesaId: 'mesa-42' }
    handlers['combat:sync:request'](payload)
    expect(socket._emits).toContainEqual({ room: 'mesa-42', event: 'combat:sync:request', payload })
  })
})
