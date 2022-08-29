import { ICombatTechnique } from '@igikanam/interfaces';
import { sourceTags } from './source-tags.constant';
import { users } from './users.constant';

export const combatTechniques: ICombatTechnique[] = [
  {
    combatTechniqueId: 'e025993c-10d4-4114-93d3-44049e4d9c98',
    name: 'Blowguns',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'DEX',
    category: 'Ranged',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: 'c44426f2-5582-4da7-bc3c-611a88957799',
    name: 'Bows',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'DEX',
    category: 'Ranged',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '6c645a39-93b0-46b5-9125-68e587657ae2',
    name: 'Brawling',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'AGI/STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '3fe0a666-a061-445e-8348-fb551dc123c0',
    name: 'Chain Weapons',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '5fb39f9f-3bf9-4a68-a056-c2e54465b590',
    name: 'Crossbows',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'DEX',
    category: 'Ranged',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '553b7e7f-4e95-420b-9b05-8453d0a31747',
    name: 'Daggers',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'AGI',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '20054cd5-4b02-48c8-8baa-6fc43b3f3c09',
    name: 'Discuses',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'DEX',
    category: 'Ranged',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '2ae980b8-fd96-4565-a062-e4db13d25d9a',
    name: 'Fencing Weapons',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'AGI',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '27f89b09-5557-4cba-a498-d1e32fb4eb21',
    name: 'Impact Weapons',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '8c27a061-c784-4a61-aff8-48d65f80e420',
    name: 'Lances',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '54e500a5-4745-4664-9314-b49050ae4d91',
    name: 'Polearms',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'AGI/STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '14e0a348-320f-456d-9684-466c0dbd97a0',
    name: 'Shields',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '201658d3-2645-42f9-b118-593fba88c4a1',
    name: 'Slings',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'DEX',
    category: 'Ranged',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '50847be4-5711-4b5b-aaf3-33d3553e97f6',
    name: 'Swords',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'AGI/STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '77c06be7-89a6-476d-8543-df729fefdef4',
    name: 'Thrown Weapons',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'DEX',
    category: 'Ranged',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: 'b973707f-5879-4842-ab09-d481f6f702a4',
    name: 'Two-Handed Impact Weapons',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: 'd9bdb336-cc27-49e4-b1b4-a262a4f3a465',
    name: 'Two-Handed swords',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: 'f2f20922-7a09-4919-a1f2-27a86551ad08',
    name: 'Whips',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'DEX',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '949e7a97-3dae-4d6a-add6-8441fc48b231',
    name: 'Cybernetic weapons',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'AGI/STR',
    category: 'Cybernetics',
    sourceTag: sourceTags[1],
    createdBy: users[2], // admin
  },
];
