import { uniq } from 'lodash'
import { getFactionList } from 'meta/faction_list'
import { TEntry } from 'types/data'
import {
  BATTLESHOCK_PHASE,
  CHARGE_PHASE,
  COMBAT_PHASE,
  END_OF_BATTLESHOCK_PHASE,
  END_OF_CHARGE_PHASE,
  END_OF_COMBAT_PHASE,
  END_OF_HERO_PHASE,
  END_OF_MOVEMENT_PHASE,
  END_OF_SETUP,
  END_OF_SHOOTING_PHASE,
  HERO_PHASE,
  MOVEMENT_PHASE,
  SAVES_PHASE,
  SHOOTING_PHASE,
  START_OF_BATTLESHOCK_PHASE,
  START_OF_CHARGE_PHASE,
  START_OF_COMBAT_PHASE,
  START_OF_HERO_PHASE,
  START_OF_MOVEMENT_PHASE,
  START_OF_ROUND,
  START_OF_SHOOTING_PHASE,
  WOUND_ALLOCATION_PHASE,
} from 'types/phases'

const phaseMap = {
  'After armies are set up, but before': END_OF_SETUP,

  'start of each battle round': START_OF_ROUND,

  'charge rolls': CHARGE_PHASE,

  'in the combat phase': COMBAT_PHASE,
  'made with melee weapons': COMBAT_PHASE,
  'can pile-in': COMBAT_PHASE,
  'can pile in': COMBAT_PHASE,

  'with missile weapons': SHOOTING_PHASE,

  'start of your battleshock phase': START_OF_BATTLESHOCK_PHASE,
  'start of your charge phase': START_OF_CHARGE_PHASE,
  'start of your combat phase': START_OF_COMBAT_PHASE,
  'start of your hero phase': START_OF_HERO_PHASE,
  'start of your movement phase': START_OF_MOVEMENT_PHASE,
  'start of your shooting phase': START_OF_SHOOTING_PHASE,

  'in your battleshock phase': BATTLESHOCK_PHASE,
  'in your charge phase': CHARGE_PHASE,
  'in your combat phase': COMBAT_PHASE,
  'in your hero phase': HERO_PHASE,
  'in your movement phase': MOVEMENT_PHASE,
  'in your shooting phase': SHOOTING_PHASE,

  'in the enemy battleshock phase': BATTLESHOCK_PHASE,
  'in the enemy charge phase': CHARGE_PHASE,
  'in the enemy combat phase': COMBAT_PHASE,
  'in the enemy hero phase': HERO_PHASE,
  'in the enemy movement phase': MOVEMENT_PHASE,
  'in the enemy shooting phase': SHOOTING_PHASE,

  "in your opponent's battleshock phase": BATTLESHOCK_PHASE,
  "in your opponent's charge phase": CHARGE_PHASE,
  "in your opponent's combat phase": COMBAT_PHASE,
  "in your opponent's hero phase": HERO_PHASE,
  "in your opponent's movement phase": MOVEMENT_PHASE,
  "in your opponent's shooting phase": SHOOTING_PHASE,

  'end of your battleshock phase': END_OF_BATTLESHOCK_PHASE,
  'end of your charge phase': END_OF_CHARGE_PHASE,
  'end of your combat phase': END_OF_COMBAT_PHASE,
  'end of your hero phase': END_OF_HERO_PHASE,
  'end of your movement phase': END_OF_MOVEMENT_PHASE,
  'end of your shooting phase': END_OF_SHOOTING_PHASE,

  'If this model is slain': WOUND_ALLOCATION_PHASE,
  'If this unit is slain': WOUND_ALLOCATION_PHASE,
  'you allocate a wound': WOUND_ALLOCATION_PHASE,
  'you allocate a mortal wound': WOUND_ALLOCATION_PHASE,

  'Reroll save roll': SAVES_PHASE,
  'reroll save roll': SAVES_PHASE,
  'to save roll': SAVES_PHASE,
  'Worsen the rend of': SAVES_PHASE,
}

// Effect names that are flagged by the script, but have been verified and should be ignored for the phase checking
const phasesWhitelist = [
  'Acid Ichor',
  'Ahead Full',
  'Been There, Done That',
  'Blizzard Speaker',
  'Bloodthirsty Predators',
  'Bogeyman',
  'Brass-clad Shield',
  'Celestial Configuration',
  'Celestial Rites',
  'Clutching Pseudopods',
  'Deadly Symbiosis',
  'Deathblow',
  'Dormant Energies',
  'Great Cauldron',
  'Hellshard Amulet',
  'Horrific Opponent',
  'Lurelight',
  'None Shall Defile the Icon',
  'Old Grumblers',
  'Rune Lore: Ancestral Shield',
  'Runemarked Shield',
  'Seeker of Souls',
  'Violent Fury',
  'Beastshield',
  'Whirling Death',
  'Warding Lantern',
  'Attuned to Magic',
  'Tanglethorn Thicket',
  'Grand Ritual of Awakening',
  'Strike the Runes',
]

let logged: string[] = []

const log_once = (message: string) => {
  if (!logged.includes(message)) {
    console.log(message)
    logged = [...logged, message]
  }
}

const verify = () => {
  log_once('Starting rules verification...')
  const armyList = getFactionList()
  let identicalEffects: Record<string, Record<string, string | undefined>[]> = {}
  Object.values(armyList).forEach(faction => {
    const { AggregateArmy } = faction

    const { Units = [] } = AggregateArmy

    Units.forEach((unit: TEntry) => {
      unit.effects.forEach(e => {
        const matchBy = `${e.name} | ${e.desc} | ${e.when}`
        const effectInfo = { name: unit.name, id: e.id }
        const matches = identicalEffects[matchBy]
        if (matches) {
          if (!matches.find(existing => existing.name === effectInfo.name))
            identicalEffects[matchBy] = [...matches, effectInfo]
        } else {
          identicalEffects[matchBy] = [effectInfo]
        }

        if (phasesWhitelist.includes(e.name)) return
        if (e.command_ability) return

        if (e.spell || unit.spell) {
          if (!e.when.includes(HERO_PHASE)) log_once(`${e.name} should be in ${HERO_PHASE}`)
          return
        }

        if (e.when.length === 0) {
          return log_once(`${e.name} is missing a 'when' value`)
        }

        if (!e.spell && new RegExp('Casting value ', 'gi').test(e.desc)) {
          return log_once(`${e.name} should be marked as a spell`)
        }

        Object.keys(phaseMap).forEach(phrase => {
          const phase = phaseMap[phrase]

          if (e.when.includes(phase)) return

          const regex = new RegExp(phrase, 'gi')
          if (regex.test(e.desc)) {
            return log_once(`${e.name} should probably be in ${phase}`)
          }
        })
      })
    })
  })

  let allIds: (string | undefined)[] = []
  Object.entries(identicalEffects).forEach(([description, entries]) => {
    if (entries.length < 2) return
    const ids = entries.map(entry => entry.id)
    allIds = uniq([...allIds, ...ids])
    const matchingIds = ids.every((val, i, arr) => val !== undefined && val === arr[0])
    if (matchingIds) return
    console.log(description, entries)
  })
  console.log('Done!')
}

verify()
