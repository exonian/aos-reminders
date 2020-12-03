import { pickEffects, tagAs } from 'factions/metatagger'
import {
  BATTLESHOCK_PHASE,
  CHARGE_PHASE,
  COMBAT_PHASE,
  DURING_GAME,
  DURING_SETUP,
  END_OF_COMBAT_PHASE,
  END_OF_MOVEMENT_PHASE,
  HERO_PHASE,
  MOVEMENT_PHASE,
  SAVES_PHASE,
  SHOOTING_PHASE,
  START_OF_HERO_PHASE,
  TURN_FOUR_START_OF_ROUND,
  WOUND_ALLOCATION_PHASE,
} from 'types/phases'
import CommandAbilities from './command_abilities'
import Prayers from './prayers'
import Spells from './spells'

const MorathiEffect = {
  name: `One Soul, Two Bodies / Two Bodies, One Soul`,
  desc: `Wounds and mortal wounds allocated to Morathi-Khaine have no effect and are instead allocated to the Shadow Queen. Wounds allocated to the Shadow Queen in this manner cannot be negated.
           If a spell or ability would cause Morathi-Khaine or the Shadow Queen to be slain without wounds being allocated is instead not slain and 3 wounds are allocated to the Shadow Queen.
           If the Shadow Queen is slain, Morathi-Khaine is also slain after the Shadow Queen is removed from play.`,
  when: [WOUND_ALLOCATION_PHASE],
}

const HagQueenEffects = [
  {
    name: `Priestess of Khaine`,
    desc: `Pick a prayer this model knows and roll a D6. On a result of 1 she is found unworthy and suffers 1 mortal wound. On a 2 nothing happens. On a 3+ the prayer is successful and its effect takes place. A Hag Queen knows the Rune of Khaine and Touch of Death prayers.`,
    when: [HERO_PHASE],
  },
  ...pickEffects(Prayers, ['Rune of Khaine']),
  ...pickEffects(Prayers, ['Touch of Death']),
]

const BloodwrackEffects = [
  {
    name: `Bloodwrack Stare`,
    desc: `Pick a unit visible to this model and roll a D6 for each model in the target unit that is within range. For each 5+ the unit suffers 1 mortal wound.`,
    when: [SHOOTING_PHASE],
  },
  {
    name: `Magic`,
    desc: `This model is a wizard. Can attempt to cast 1 spell and attempt to unbind 1 spell. Knows Arcane Bolt, Mystic Shield, and Enfeebling Foe.`,
    when: [HERO_PHASE],
  },
  ...pickEffects(Spells, ['Enfeebling Foe']),
]

const WitchbrewEffects = [
  {
    name: `Witchbrew`,
    desc: `You can pick a friendly Daughters of Khaine unit within 3" of this model to drink Witchbrew.`,
    when: [HERO_PHASE],
  },
  {
    name: `Witchbrew`,
    desc: `If active, reroll failed wound rolls for that unit's melee weapons.`,
    when: [COMBAT_PHASE],
  },
  {
    name: `Witchbrew`,
    desc: `If active, you do not need to take battleshock tests for the unit.`,
    when: [BATTLESHOCK_PHASE],
  },
]

const SlaughterQueenEffects = [
  {
    name: `Pact of Blood`,
    desc: `A Slaughter Queen can attempt to unbind one spell in the enemy hero phase as if it were a wizard.`,
    when: [HERO_PHASE],
  },
  ...pickEffects(CommandAbilities, ['Orgy of Slaughter']),
]

const AvatarOfKhaineEffects = [
  ...pickEffects(Prayers, ['Wrath of Khaine']),
  {
    name: `Animated`,
    desc: `The Avatar of Khaine cannot shoot and cannot be selected to fight unless it has been Animated in the hero phase (either via prayer or Blood Rite).`,
    when: [DURING_GAME],
  },
  {
    name: `Idol of Worship`,
    desc: `Add 1 to the bravery characteristic of friendly Daughters of Khaine units that are within 7" of any friendly Avatars of Khaine.`,
    when: [DURING_GAME],
  },
]

const StandardBearerAndHornblowerEffects = [
  {
    name: `Standard Bearer`,
    desc: `Roll two dice instead of one and discard the highest result if this unit contains any standard bearers.`,
    when: [BATTLESHOCK_PHASE],
  },
  {
    name: `Hornblower`,
    desc: `A unit that includes any hornblowers can run and charge.`,
    when: [MOVEMENT_PHASE, CHARGE_PHASE],
  },
]

const HeartpiercerShieldEffect = {
  name: `Heartpiercer Shield`,
  desc: `Add 1 to the save rolls of this unit against melee attacks. If the unmodified melee save is a 6, the attacking unit suffers 1 mortal wound after all its attacks have resolved.`,
  when: [SAVES_PHASE],
}

const DescendToBattleEffects = [
  {
    name: `Descend to Battle`,
    desc: `Instead of setting up this unit on the battlefield, you can set it aside to be deployed later in the game.`,
    when: [DURING_SETUP],
  },
  {
    name: `Descend to Battle`,
    desc: `If this unit is still off the battlefield, it is slain.`,
    when: [TURN_FOUR_START_OF_ROUND],
  },
  {
    name: `Descend to Battle`,
    desc: `If set aside, you may set up this unit anywhere on the battlefield that is more than 9" from any enemy models.`,
    when: [END_OF_MOVEMENT_PHASE],
  },
]

const BladedBucklersEffect = {
  name: `Bladed Bucklers`,
  desc: `Units with bladed bucklers have a save characteristic of 5+ in this phase. In addition, each time you make an unmodified save roll of 6 in this phase, the attacking unit suffers 1 mortal wound after it has made all of its attacks.`,
  when: [COMBAT_PHASE],
}

const BloodshieldEffect = {
  name: `Bloodshield`,
  desc: `Add 1 to the save rolls for friendly Daughters of Khaine units that are wholly within range of this model.`,
  when: [SAVES_PHASE],
}

const BladedImpactEffect = {
  name: `Bladed Impact`,
  desc: `Roll a D6 if this model ends a charge move within 1" of any enemy units. On a 2+ that nearest enemy suffers D3 mortal wounds.`,
  when: [CHARGE_PHASE],
}

const HeartseekersEffect = {
  name: `Heartseekers`,
  desc: `Each time you make an unmodified hit roll of 6 for this unit's Heartseeker Bow, the target suffers 1 mortal wound instead of the normal damage.`,
  when: [SHOOTING_PHASE],
}

const TurnedCrystalEffect = {
  name: `Turned to Crystal`,
  desc: `You can pick 1 enemy unit within 1" of this unit and roll D6 for each model in this unit. On each 3+ the target suffers 1 mortal wound.`,
  when: [END_OF_COMBAT_PHASE],
}

const Units = {
  'Morathi-Khaine': {
    effects: [
      {
        name: `Commanding Presence`,
        desc: `Subtract 1 from hit rolls targeting this model.`,
        when: [SHOOTING_PHASE, COMBAT_PHASE],
      },
      MorathiEffect,
      {
        name: `Magic`,
        desc: `This model is a wizard. Can attempt to cast 3 spells and attempt to unbind 2 spells. Knows Arcane Bolt, Mystic Shield, and Black Horror of Ulgu.`,
        when: [HERO_PHASE],
      },
      ...pickEffects(Spells, ['Black Horror of Ulgu']),
      ...pickEffects(CommandAbilities, ['Worship Through Bloodshed']),
    ],
  },
  'The Shadow Queen': {
    effects: [
      {
        name: `Fury of the Shadow Queen`,
        desc: `While this model is within 3" of enemy units, friendly Harpies and Melusai units wholly within 18" of this model add 1 to their melee attacks characteristics.`,
        when: [COMBAT_PHASE],
      },
      MorathiEffect,
      {
        name: `Iron Heart of Khaine`,
        desc: `No more than 3 non-negated wounds/mortal wounds can be allocated to this model in a turn. Further wounds are ignored with no effect.
               Wounds/mortal wounds allocated to this model at the start of the battle round count towards the first turn of that round.
               Wounds/mortal wounds allocated to this model at the end of the battle round count towards the second turn of that round.
               Spells/abilities causing this model to be slain with no wounds allocated instead allocates 3 unnegatable wounds, subject to the 3 wound per turn limit.
               Wounds allocated to this model cannot be healed.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
    ],
  },
  'Hag Queen': {
    effects: [...HagQueenEffects, ...WitchbrewEffects],
  },
  'Slaughter Queen': {
    effects: [...HagQueenEffects, ...SlaughterQueenEffects, ...pickEffects(Prayers, ['Dance of Doom'])],
  },
  'Avatar of Khaine': {
    effects: [...AvatarOfKhaineEffects],
  },
  'Hag Queen on Cauldron of Blood': {
    effects: [
      BladedImpactEffect,
      BloodshieldEffect,
      ...WitchbrewEffects,
      ...HagQueenEffects,
      ...AvatarOfKhaineEffects,
    ],
  },
  'Witch Aelves': {
    effects: [
      {
        name: `Hag`,
        desc: `Add 1 to hit rolls for a Hag.`,
        when: [COMBAT_PHASE],
      },
      ...StandardBearerAndHornblowerEffects,
      {
        name: `Paired Sacrificial Knives`,
        desc: `Add 1 to the attacks characteristic of a Witch Aelf's Sacrificial Knife if it is armed with paired Sacrificial Knives.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Frenzied Fervour`,
        desc: `If this unit is within any friendly Daughters of Khaine heroes in this phase, add 1 to the attacks characteristic of its Sacrificial Knives until the end of the phase.`,
        when: [COMBAT_PHASE],
      },
      BladedBucklersEffect,
    ],
  },
  'Sisters of Slaughter': {
    effects: [
      {
        name: `Handmaiden`,
        desc: `Add 1 to hit rolls for a Handmaiden.`,
        when: [COMBAT_PHASE],
      },
      ...StandardBearerAndHornblowerEffects,
      {
        name: `Dance of Death`,
        desc: `Sisters of Slaughter can be chosen to pile in and attack in the combat phase if they are within 6" of an enemy, and can move up to 6" when they pile in.`,
        when: [COMBAT_PHASE],
      },
      BladedBucklersEffect,
    ],
  },
  'Slaughter Queen on Cauldron of Blood': {
    effects: [
      BladedImpactEffect,
      BloodshieldEffect,
      ...HagQueenEffects,
      ...AvatarOfKhaineEffects,
      ...SlaughterQueenEffects,
    ],
  },
  'Bloodwrack Shrine': {
    effects: [
      BladedImpactEffect,
      {
        name: `Aura of Agony`,
        desc: `Roll a D6 for each enemy unit within 7" of any friendly Bloodwrack Shrines. If the dice roll is greater than or equal to the score listed in the damage table, that unit suffers D3 mortal wounds.`,
        when: [START_OF_HERO_PHASE],
      },
      ...BloodwrackEffects,
    ],
  },
  'Blood Sisters': {
    effects: [
      {
        name: `Gorgai`,
        desc: `Add 1 to the attacks characteristic of a Gorgai's Heartshard Glaive.`,
        when: [COMBAT_PHASE],
      },
      TurnedCrystalEffect,
    ],
  },
  'Blood Stalkers': {
    effects: [HeartseekersEffect],
  },
  'Bloodwrack Medusa': {
    effects: [...BloodwrackEffects],
  },
  'Doomfire Warlocks': {
    effects: [
      {
        name: `Master of Warlocks`,
        desc: `Add 1 to hit rolls for a Master of Warlocks' Doomfire Crossbow.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Master of Warlocks`,
        desc: `Add 1 to hit rolls for a Master of Warlocks' Cursed Scimitar.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Doomfire Coven`,
        desc: `Add 1 to the casting and unbinding rolls for this unit if it has 10 or more models.`,
        when: [HERO_PHASE],
      },
      {
        name: `Magic`,
        desc: `This unit counts as a wizard. Can attempt to cast 1 spell and attempt to unbind 1 spell. Knows Arcane Bolt, Mystic Shield, and Doomfire.`,
        when: [HERO_PHASE],
      },
      ...pickEffects(Spells, ['Doomfire']),
    ],
  },
  'Khinerai Heartrenders': {
    effects: [
      {
        name: `Shryke`,
        desc: `Add 1 to the attacks characteristic for a Shryke.`,
        when: [SHOOTING_PHASE, COMBAT_PHASE],
      },
      ...DescendToBattleEffects,
      {
        name: `Fire and Flight`,
        desc: `After this unit has finished making all of its attacks, roll a D6: on a 4+ it can make a 6" normal move as if it were your movement phase, but it cannot retreat or run as part of this move.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Death From Above`,
        desc: `This unit can run and shoot in the same turn.`,
        when: [MOVEMENT_PHASE],
      },
      {
        name: `Death From Above`,
        desc: `Change the Rend characteristic of this unit's Barbed Javelins to -2 if it was set up on the battlefield in this turn.`,
        when: [SHOOTING_PHASE],
      },
      HeartpiercerShieldEffect,
    ],
  },
  'Khinerai Lifetakers': {
    effects: [
      {
        name: `Harridynn`,
        desc: `Add 1 to hit rolls for a Harridynn.`,
        when: [COMBAT_PHASE],
      },
      ...DescendToBattleEffects,
      {
        name: `Fight and Flight`,
        desc: `After this unit has finished making all of its attacks, roll a D6: on a 4+ it can make a 6" normal move as if it were your movement phase, but it cannot run as part of this move.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Death on the Wind`,
        desc: `Add 1 to the damage characteristic of this unit's Barbed Sickles if it made a charge move in the same turn.`,
        when: [CHARGE_PHASE, COMBAT_PHASE],
      },
      HeartpiercerShieldEffect,
    ],
  },
  'Morgwaeth the Bloodied': {
    effects: [...HagQueenEffects, ...WitchbrewEffects],
  },
  'The Blade-Coven': {
    effects: [
      {
        name: `Kyrae`,
        desc: `Kyrae has a Wounds characteristic of 2.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      HeartseekersEffect,
      {
        name: `Daughters of the First Temple`,
        desc: `Roll a D6 each time a friendly Morgwaeth the Bloodied unit within 3" of this unit suffers a wound or mortal wound. On a 4+ this unit is allocated the wound instead.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
    ],
  },
  'Khainite Shadowstalkers': {
    effects: [
      {
        name: `Shroud Queen`,
        desc: `This model has a Wounds characteristic of 3.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Shadow Leap`,
        desc: `Instead of making a normal move, you can remove this unit and set it up again on the battlefield more than 9" from enemy units.`,
        when: [MOVEMENT_PHASE],
      },
      {
        name: `Cursed Missiles`,
        desc: `Unmodified hits of 6 for this weapon inflict 1 mortal wound instead of normal damage (attack ends).`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Harness Shadow`,
        desc: `Subtract 1 from melee attack hit rolls targeting this unit.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Melusai Ironscale': {
    effects: [
      {
        name: `Blood of the Oracle`,
        desc: `Roll a D6 each time this unit is affected by a spell or endless spell. On a 5+, ignore the effects on this model.`,
        when: [HERO_PHASE],
      },
      {
        name: `Gory Offering`,
        desc: `If any enemy models were slain by this model in this phase, you can add 1 to the attacks characteristic of friendly Melusai units wholly within 12". Effect lasts until the end of the phase.`,
        when: [COMBAT_PHASE],
      },
      TurnedCrystalEffect,
      ...pickEffects(CommandAbilities, ['Wrath of the Scathborn']),
    ],
  },
}

export default tagAs(Units, 'unit')