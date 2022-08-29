import { ISkill } from '@igikanam/interfaces';
import { sourceTags } from './source-tags.constant';
import { users } from './users.constant';

export const skills: ISkill[] = [
  {
    skillId: '135d9304-4ffb-4f85-bc40-39d24c5bf42e',
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
    skillId: '960d1de0-ff01-4b13-8f32-f54a4020b10a',
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
    skillId: 'b8dca268-037f-407d-99e5-d41f63b4d628', // gets removed during e2e tests 'successfully deletes the skill'
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
    skillId: 'a4af674f-94eb-487e-902d-01bfee757a44', // gets removed during e2e test 'returns 401 for unauthorized user'
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
    skillId: '2bc66689-f987-4d6d-bfe3-ca28c80b4cad', // gets removed during e2e test 'returns 403 for User role when trying to delete skill of another user'
    name: 'Alchemy',
    check: 'COU/SGC/DEX',
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
  {
    skillId: '0d7c0610-8407-4d45-9031-7d6819f0959a',
    name: 'Foraging',
    check: 'COU/SGC/INT',
    quality: 'you found more resources',
    failedCheck: "you don't find anything of value.",
    criticalSuccess: 'find high quality items.',
    botch: 'you find an item that actually is harmful.',
    improvementCost: 'C',
    applications: 'Finding food, Gathering resources',
    uses: '',
    newApplication: '',
    sourceTag: sourceTags[2], // space
    category: 'Craft',
    createdBy: users[0], // user
  },
  {
    skillId: 'd2b704cb-d2d4-4b1b-9e4a-f203e0c9edbd', // gets removed during e2e test 'returns 200 for User role when trying to delete their own skill'
    name: 'Hacking',
    check: 'SGC/SGC/INT',
    quality: 'you discover more information',
    failedCheck: 'you fail to find any information.',
    criticalSuccess: 'You gain full access.',
    botch: 'your intrusion is detected and are locked out.',
    improvementCost: 'C',
    applications: '',
    uses: '',
    newApplication: '',
    sourceTag: sourceTags[2], // space
    category: 'Craft',
    createdBy: users[0], // user
  },
  {
    skillId: 'f76de747-2e9c-4f16-85fc-445261303705',
    name: 'Explosives',
    check: 'COU/SGC/INT',
    quality: 'the explosive is stronger',
    failedCheck: 'the explosive is ruined, or a disarming attempt fails.',
    criticalSuccess: 'create the perfect explosive for the use case.',
    botch: 'the explosive explodes dealing propertional but reduced damage.',
    improvementCost: 'C',
    applications: 'Explosives, Disarming, Booby Traps',
    uses: '',
    newApplication: '',
    sourceTag: sourceTags[2], // space
    category: 'Craft',
    createdBy: users[1], // user
  },
];
