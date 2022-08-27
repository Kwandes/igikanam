import { ISpecialAbility } from '@igikanam/interfaces';
import { sourceTags } from './source-tags.constant';
import { users } from './users.constant';

export const SpecialAbilities: ISpecialAbility[] = [
  {
    abilityId: 'e025993c-10d4-4114-93d3-44049e4d9c98',
    name: 'Grapple',
    rule: 'You can only grapple opponents of an equal or smaller size category. Grappling requires a successful Brawling check. An opponent who can’t defend is pinned down. A grappled opponent gains the states of prone and bound. To escape, the opponent must make a successful check using Feat of Strength (Dragging & Pulling). You cannot defend as long as you hold your opponent. You need both hands free to grapple an enemy',
    prerequisites: 'Strength 12',
    apValue: 5,
    sourceTag: sourceTags[0],
    category: 'Combat',
    createdBy: users[2], // admin
  },
  {
    abilityId: 'c44426f2-5582-4da7-bc3c-611a88957799',
    name: 'Targeted Shot',
    rule: 'Target a specific hit zone with a ranged weapon. To do so, your attack receives a penalty based on the zone you are trying to hit',
    prerequisites: 'Dexterity 13',
    apValue: 10,
    sourceTag: sourceTags[0],
    category: 'Combat',
    createdBy: users[2], // admin
  },
  {
    abilityId: '6c645a39-93b0-46b5-9125-68e587657ae2',
    name: 'Analyst',
    rule: 'The special ability Analyst lets you analyze artifacts, magical creatures, and spells. Heroes with this SA can make a check using Magical Lore (appropriate application) and collect more QL than usual (see Magical Analysis on Core Rules page 268). Depending on the QL, you get a clearer picture of the object’s uses, the type of creature, or the spell’s magical effect. This SA gives you a new use of the skill Magical Lore',
    prerequisites: 'Magical lore 4',
    apValue: 5,
    sourceTag: sourceTags[0],
    category: 'General',
    createdBy: users[2], // admin
  },
  {
    abilityId: '3fe0a666-a061-445e-8348-fb551dc123c0',
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
    abilityId: '5fb39f9f-3bf9-4a68-a056-c2e54465b590',
    name: 'Overcharge',
    rule: '-2 penalty to hit, do extra 1D3 (roll 1D6 / 2) damage + set on fire (1D4 per round). Roll 1D20, on a 20 the weapon is unusable until it gets repaired during a rest, or Weapon maintenance check outside of combat. Takes 15 minutes to fix',
    prerequisites: 'Energy weapons',
    apValue: 15,
    sourceTag: sourceTags[4],
    category: 'Combat',
    createdBy: users[2], // admin
  },
  {
    abilityId: 'a5f39741-ad2a-4492-ba53-fd8cd6854da1',
    name: 'Suppressing fire',
    rule: 'Weapons with 4 rounds or more, no precision rifles: Fire 4 times in one combat round with a -4 penalty to hit (roll for each shot)',
    prerequisites: 'Semi-auto Ballistic weapons with more than 4 bullets',
    apValue: 20,
    sourceTag: sourceTags[4],
    category: 'Combat',
    createdBy: users[2], // admin
  },
];
