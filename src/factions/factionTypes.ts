import { TEffects } from 'types/data'

export type TObjWithEffects = object & { effects: TEffects[] }
export type TParentEffectsObjWithEffects = Record<string, TObjWithEffects>

export type TSubFactionEntry = {
  available: TParentEffectsObjWithEffects[]
  mandatory: TParentEffectsObjWithEffects[]
}

export type TSubFaction = {
  units?: TSubFactionEntry
  battalions?: TSubFactionEntry
  spells?: TSubFactionEntry
  effects: TEffects[]
  command_traits?: TSubFactionEntry
  command_abilities?: TSubFactionEntry
  flavors?: TSubFactionEntry
  artifacts?: TSubFactionEntry
  endless_spells?: TSubFactionEntry
  scenery?: TSubFactionEntry
}

export type TSubFactions = Record<string, TSubFaction>
