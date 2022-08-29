import { ISpecialAbility } from '@igikanam/interfaces';
import { sourceTags } from './source-tags.constant';
import { users } from './users.constant';

export const SpecialAbilities: ISpecialAbility[] = [
  {
    abilityId: 'db978150-1a4d-452d-9ee3-84d4d04de55d',
    name: 'Grapple',
    rule: 'You can only grapple opponents of an equal or smaller size category. Grappling requires a successful Brawling check. An opponent who can’t defend is pinned down. A grappled opponent gains the states of prone and bound. To escape, the opponent must make a successful check using Feat of Strength (Dragging & Pulling). You cannot defend as long as you hold your opponent. You need both hands free to grapple an enemy',
    prerequisites: 'Strength 12',
    apValue: 5,
    sourceTag: sourceTags[0],
    category: 'Combat',
    createdBy: users[2], // admin
  },
  {
    abilityId: 'f4180fde-2192-4231-8c9f-94dc03b4132f',
    name: 'Targeted Shot',
    rule: 'Target a specific hit zone with a ranged weapon. To do so, your attack receives a penalty based on the zone you are trying to hit',
    prerequisites: 'Dexterity 13',
    apValue: 10,
    sourceTag: sourceTags[0],
    category: 'Combat',
    createdBy: users[2], // admin
  },
  {
    abilityId: '2b59835a-6aad-4ed5-87f8-4b3d1fb2f149',
    name: 'Analyst',
    rule: 'The special ability Analyst lets you analyze artifacts, magical creatures, and spells. Heroes with this SA can make a check using Magical Lore (appropriate application) and collect more QL than usual (see Magical Analysis on Core Rules page 268). Depending on the QL, you get a clearer picture of the object’s uses, the type of creature, or the spell’s magical effect. This SA gives you a new use of the skill Magical Lore',
    prerequisites: 'Magical lore 4',
    apValue: 5,
    sourceTag: sourceTags[0],
    category: 'General',
    createdBy: users[2], // admin
  },
  {
    abilityId: '26ffbb64-4c5e-449d-8ecf-987591fe13fc', // gets removed during e2e test 'returns 403 for User role when trying to delete special-ability of another user'
    name: 'Alcohol Tolerance',
    rule: `Alcohol-tolerant drinkers do not have to make Carousing or Poison checks as long as they do not imbibe more units of alcohol than their level in Alcohol Tolerance.

    For example, a hero with Alcohol Tolerance II can ignore the effects of up to 2 tankards of beer or 2 small cups of spirits (or 1 tankard of beer and 1 small cup of spirits), but must start making poison checks starting with the next unit of alcohol consumed`,
    prerequisites: '',
    apValue: 2,
    level: 4,
    sourceTag: sourceTags[0],
    category: 'General',
    createdBy: users[2], // admin
  },
  {
    abilityId: '8067fbf6-eb8c-4dfe-8657-01fffebbcab7', // gets removed during e2e test 'successfully deletes the special-ability'
    name: 'Overcharge',
    rule: '-2 penalty to hit, do extra 1D3 (roll 1D6 / 2) damage + set on fire (1D4 per round). Roll 1D20, on a 20 the weapon is unusable until it gets repaired during a rest, or Weapon maintenance check outside of combat. Takes 15 minutes to fix',
    prerequisites: 'Energy weapons',
    apValue: 15,
    sourceTag: sourceTags[2],
    category: 'Combat',
    createdBy: users[2], // admin
  },
  {
    abilityId: '96283b62-d47e-4668-9fd0-b2e20e6bdbb9', // gets removed during e2e test 'returns 401 for unauthorized user'
    name: 'Suppressing fire',
    rule: 'Weapons with 4 rounds or more, no precision rifles: Fire 4 times in one combat round with a -4 penalty to hit (roll for each shot)',
    prerequisites: 'Semi-auto Ballistic weapons with more than 4 bullets',
    apValue: 20,
    sourceTag: sourceTags[2],
    category: 'Combat',
    createdBy: users[2], // admin
  },
  {
    abilityId: '219b09b9-2f24-4219-85e7-a31e384ab27d',
    name: 'Scan surroundings',
    rule: 'Release a drone and over one minute gather information about the area of max 20x20 meters. Can x-ray through wood and has thermal vision',
    prerequisites: '',
    apValue: 20,
    sourceTag: sourceTags[2],
    category: 'General',
    createdBy: users[0], // user 1
  },
  {
    abilityId: '5976be28-a434-4f24-ac45-ced5d9029bfc', // gets removed during e2e test 'returns 200 for User role when trying to delete their own special-ability'
    name: 'Divide by zero',
    rule: 'Temporarily confuse computer-based minds and logic systems, reducing their accuracy and defense by -2, or providing disadvantage on logic-based checks. Roll Hacking(woodworking) and lasts QL Combat rounds. Is an action',
    prerequisites: '',
    apValue: 20,
    sourceTag: sourceTags[2],
    category: 'Combat',
    createdBy: users[0], // user 1
  },
  {
    abilityId: 'ddad8337-f5e9-4f4f-8ff9-31fc5fd3529c',
    name: 'Curve Bullet',
    rule: 'Requires being mana-aware. Ignore cover by curving the bullet around it. Damage -2.',
    prerequisites: 'Ballistic weapons only',
    apValue: 20,
    sourceTag: sourceTags[2],
    category: 'Combat',
    createdBy: users[1], // user 2
  },
];
