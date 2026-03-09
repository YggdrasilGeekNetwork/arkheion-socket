export interface MesaPayload {
  mesaId: string
}

export interface CombatStartPayload extends MesaPayload {
  initiativeOrder?: string[]
}

export interface CombatEndPayload extends MesaPayload {}

export interface InitiativeRequestPayload extends MesaPayload {}

export interface InitiativeRollPayload extends MesaPayload {
  characterId: string
  roll: number
  total: number
}

export interface TurnChangePayload extends MesaPayload {
  characterId: string
  round: number
}

export interface TurnEndPayload extends MesaPayload {
  characterId: string
}

export interface CombatSyncRequestPayload extends MesaPayload {}

export interface CharacterConditionsPayload extends MesaPayload {
  characterId: string
  conditions: string[]
}

export interface CharacterActionPayload extends MesaPayload {
  characterId: string
  actions: unknown[]
}

export interface CharacterInitiativePayload extends MesaPayload {
  characterId: string
  initiative: number
}

export interface CharacterHealthPayload extends MesaPayload {
  characterId: string
  currentHp: number
  maxHp: number
}

export interface CharacterUpdatePayload extends MesaPayload {
  characterId: string
  data: Record<string, unknown>
}
