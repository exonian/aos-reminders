import { TItemDescription } from 'factions/factionTypes'
import { TTurnWhen } from 'types/phases'
import { TCollection } from './army'
import { TSelectionTypes } from './selections'

export type TEntryProperties =
  | 'artifact'
  | 'battalion'
  | 'battle_trait'
  | 'command_ability'
  | 'command_trait'
  | 'endless_spell'
  | 'mount_trait'
  | 'prayer'
  | 'scenery'
  | 'spell'
  | 'triumph'
  | 'unit'

export const ENTRY_PROPERTIES: TEntryProperties[] = [
  'artifact',
  'battalion',
  'battle_trait',
  'command_ability',
  'command_trait',
  'endless_spell',
  'mount_trait',
  'prayer',
  'scenery',
  'spell',
  'triumph',
  'unit',
]

export const lowerToUpperLookup: Record<TSelectionTypes, keyof TCollection> = {
  artifacts: 'Artifacts',
  battalions: 'Battalions',
  command_abilities: 'CommandAbilities',
  command_traits: 'CommandTraits',
  endless_spells: 'EndlessSpells',
  flavors: 'Flavors',
  mount_traits: 'MountTraits',
  prayers: 'Prayers',
  scenery: 'Scenery',
  spells: 'Spells',
  triumphs: 'Triumphs',
  units: 'Units',
}

export const upperToLowerLookup: Record<keyof TCollection, TSelectionTypes> = {
  Artifacts: 'artifacts',
  Battalions: 'battalions',
  CommandAbilities: 'command_abilities',
  CommandTraits: 'command_traits',
  EndlessSpells: 'endless_spells',
  Flavors: 'flavors',
  MountTraits: 'mount_traits',
  Prayers: 'prayers',
  Scenery: 'scenery',
  Spells: 'spells',
  Triumphs: 'triumphs',
  Units: 'units',
}

type TEntryMetadata = TItemDescription &
  {
    [prop in TEntryProperties]?: boolean
  }

export type TEntry = {
  name: string
  isSideEffect?: boolean
} & TEntryMetadata

export type TEffects = {
  name: string
  desc: string
  tag?: string
  when: TTurnWhen[]
} & {
  [prop in TEntryProperties]?: boolean
}

export interface IReminder {
  [key: string]: TTurnAction[]
}

export type TCondition = {
  type: TSelectionTypes | null
  value: string
}

export type TTurnAction = {
  id: string
  actionTitle?: string
  condition: TCondition[]
  desc: string
  name: string
  when: TTurnWhen
  tag?: string | false
} & {
  [prop in TEntryProperties]?: boolean
}
