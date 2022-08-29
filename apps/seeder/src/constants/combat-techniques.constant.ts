import { ICombatTechnique } from '@igikanam/interfaces';
import { sourceTags } from './source-tags.constant';
import { users } from './users.constant';

export const combatTechniques: ICombatTechnique[] = [
  {
    combatTechniqueId: '92aedc84-e0d8-4ff4-9549-f1ccabb55de3',
    name: 'Blowguns',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'DEX',
    category: 'Ranged',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '67708076-e2ef-45c0-8846-e3e27b33b6cf',
    name: 'Bows',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'DEX',
    category: 'Ranged',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '629197eb-1b0b-42d8-9b45-145986ca4219',
    name: 'Brawling',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'AGI/STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '7a712017-2273-4b41-8dd7-9ac3b0b2d7ba',
    name: 'Chain Weapons',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '94469077-6d2f-4006-a84d-af9f2cd28876',
    name: 'Crossbows',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'DEX',
    category: 'Ranged',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: '06ffbca6-020f-403f-b13a-3fc605325e2f',
    name: 'Daggers',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'AGI',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: 'a0822c14-9134-4d41-a6d7-7f1cc6d5903e',
    name: 'Discuses',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'DEX',
    category: 'Ranged',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: 'd8cf5bbf-19b5-4090-bdde-b0d4cb8b922c',
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
    combatTechniqueId: 'b973707f-5879-4842-ab09-d481f6f702a4', // gets removed during e2e test 'successfully deletes the CombatTechnique'
    name: 'Two-Handed Impact Weapons',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: 'd9bdb336-cc27-49e4-b1b4-a262a4f3a465', // gets removed during e2e test 'returns 403 for User role when trying to delete CombatTechnique of another user'
    name: 'Two-Handed swords',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'STR',
    category: 'Melee',
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    combatTechniqueId: 'f2f20922-7a09-4919-a1f2-27a86551ad08', // gets removed during e2e test 'DELETE /CombatTechniques/:id'
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
    sourceTag: sourceTags[2],
    createdBy: users[0], // user1
  },
  {
    combatTechniqueId: 'b1fc3fd7-53a6-4925-a290-5bbd37123135', // gets removed during e2e test 'returns 200 for User role when trying to delete their own CombatTechnique'
    name: 'Biological Weapons',
    rating: 6,
    improvementCost: 'B',
    primaryAttribute: 'AGI',
    category: 'Ranged',
    sourceTag: sourceTags[2],
    createdBy: users[0], // user1
  },
  {
    combatTechniqueId: 'f45a0689-be2d-474c-9927-8b73c3075856',
    name: 'Two-handed Ranged Weapons',
    rating: 6,
    improvementCost: 'C',
    primaryAttribute: 'STR',
    category: 'Ranged',
    sourceTag: sourceTags[2],
    createdBy: users[1], // user2
  },
];
