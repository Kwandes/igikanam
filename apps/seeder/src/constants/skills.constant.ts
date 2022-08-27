import { ISkill } from '@igikanam/interfaces';
import { sourceTags } from './source-tags.constant';
import { users } from './users.constant';

export const skills: ISkill[] = [
  {
    skillId: 'e025993c-10d4-4114-93d3-44049e4d9c98',
    name: 'Body Control',
    check: 'AGI/AGI/CON',
    quality: 'the adventurer can more quickly squirm out of restraints.',
    failedCheck:
      'the action fails partially, requires more time, or leads to mistakes, perhaps forcing the hero to abort the action.',
    criticalSuccess:
      'the action succeeds and the hero still has another action remaining. Whatever was attempted, the hero looked very graceful.',
    botch: 'the hero falls down and suffers an injury (1D6 DP, ignoring PRO).',
    improvementCost: 'D',
    applications:
      'Acrobatics, Balance, Combat Maneuver, Jumping, Running, Squirm',
    uses: 'Tumbling',
    newApplication: 'Skiing',
    sourceTag: sourceTags[0],
    category: 'Physical',
    createdBy: users[2], // admin
  },
  {
    skillId: 'c44426f2-5582-4da7-bc3c-611a88957799',
    name: 'Disguise',
    check: 'INT/CHA/AGI',
    quality: 'it’s hard to see through the disguise.',
    failedCheck:
      ' the disguise is a poor one that won’t pass close examination.',
    criticalSuccess: 'the disguise is flawless.',
    botch:
      'people see through the disguise at once. The hero will probably get in trouble',
    improvementCost: 'B',
    applications: 'Costuming, Imitate Person, Stage Acting',
    uses: '',
    newApplication: '',
    sourceTag: sourceTags[0],
    category: 'Social',
    createdBy: users[2], // admin
  },
  {
    skillId: '6c645a39-93b0-46b5-9125-68e587657ae2',
    name: 'Animal Lore',
    check: 'COU/COU/CHA',
    quality: 'the hero gains more information about an animal.',
    failedCheck: 'the hero has no idea.',
    criticalSuccess: 'the hero has extensive knowledge of that type of animal.',
    botch:
      'you feel confident, but everything you think you know about the animal is wrong (you think an animal isn’t dangerous even though it is highly poisonous, or you believe it is herbivorous when it is actually carnivorous).',
    improvementCost: 'C',
    applications: 'Domesticated Animals, Monsters, Wild Animals',
    uses: 'Animal Taming, Breed Animals, Mimicry',
    newApplication: '',
    sourceTag: sourceTags[0],
    category: 'Nature',
    createdBy: users[2], // admin
  },
  {
    skillId: '3fe0a666-a061-445e-8348-fb551dc123c0',
    name: 'Astronomy',
    check: 'SGC/SGC/INT',
    quality:
      'quicker creation of horoscopes or determining direction of travel at night.',
    failedCheck: '',
    criticalSuccess:
      'the hero can calculate the exact movements of heavenly bodies.',
    botch:
      'make a mistake drawing up a horoscope or predicting a lunar eclipse, and so on.',
    improvementCost: 'the hero has no idea.',
    applications: 'Astrology, Calendar, Stellar Cartography',
    uses: '',
    newApplication: 'Professional Publications',
    sourceTag: sourceTags[0],
    category: 'Knowledge',
    createdBy: users[2], // admin
  },
  {
    skillId: '5fb39f9f-3bf9-4a68-a056-c2e54465b590',
    name: 'Alchemy',
    check: '',
    quality: 'the potion is of better quality',
    failedCheck:
      'the elixir is ruined, or an analysis fails to yield a useful result.',
    criticalSuccess:
      'identify an elixir precisely, including its Level and how long it will remain stable.',
    botch: 'the elixir has an unpleasant side effect.',
    improvementCost: 'C',
    applications: 'Alchemical Poisons, Elixirs, Mundane Alchemy',
    uses: '',
    newApplication: '',
    sourceTag: sourceTags[0],
    category: 'Craft',
    createdBy: users[2], // admin
  },
];
