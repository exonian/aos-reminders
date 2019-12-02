import { difference } from 'lodash'
import { IArmy } from 'types/army'
import { ISelections } from 'types/selections'
import { mapTwoListsToDict } from 'utils/mapTwoListsToDict'
import { TEntry } from 'types/data'

/**
 * Remove side effects (such as spells, artifacts, etc) to our imported selections
 * @param selections
 * @param Army
 */
export const removeSideEffectsFromImport = (selections: ISelections, Army: IArmy): ISelections => {
  // console.log(selections)
  // console.log(Army)

  const lookup = {
    allegiances: 'Allegiances',
    artifacts: 'Artifacts',
    battalions: 'Battalions',
    commands: 'Commands',
    endless_spells: 'EndlessSpells',
    scenery: 'Scenery',
    spells: 'Spells',
    traits: 'Traits',
    triumphs: 'Triumphs',
    units: 'Units',
  }
  Object.keys(selections).forEach(slice => {
    const Entries: TEntry[] = Army[lookup[slice]]
    const Names: string[] = Entries.map(x => x.name)
    const FromEffectsVals: (boolean | undefined)[] = Entries.map(x => x.fromEffect)
    const NameMap = mapTwoListsToDict(Names, NotFromEffectsVals)
  })

  return selections
}
