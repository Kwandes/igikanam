import { IAdvantage } from '@igikanam/interfaces';
import { sourceTags } from './source-tags.constant';
import { users } from './users.constant';

export const advantages: IAdvantage[] = [
  {
    advantageId: 'a914d6b8-e718-4445-b292-e9057fc86eb8',
    name: `Ambidextrous`,
    rule: `Heroes with this advantage suffer no penalties to skill checks for using their off hands. In combat, they do not suffer penalties for wielding weapons in their off hands `,
    ap: 15,
    prerequisite: ``,
    isDisadvantage: false,
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    advantageId: '957cfff5-594c-43e4-ac5d-088e0ba3ca3f',
    name: `Animal Friend`,
    rule: `Checks using Animal Lore (Domesticated Animals, Wild Animals) receive a bonus of 1 QL if the check is successful. Note that the QL can never rise above 6`,
    ap: 10,
    prerequisite: `Not Advantage Hatred for… (that type of animal)`,
    isDisadvantage: false,
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    advantageId: '90bb0e28-e277-47f4-a391-82d9960cf228',
    name: `Aptitude`, // TODO - handle allowed values
    rule: `A character with the Aptitude advantage can reroll a single D20 in every skill check for the chosen skill. The player rolls 3D20 as usual but picks one die result to reroll, keeping the best result. Aptitudes must be purchased individually for each skill, spell, or liturgical chant. You cannot purchase Aptitude for the same skill more than once (because you cannot use Aptitude to reroll more than one D20 in a check). You cannot invoke this advantage if the skill check results in a double 20 or a triple 20. You cannot pick an Aptitude for a combat technique (for this, you must use the advantage Weapon Aptitude, on Core Rules page 170). You can choose to spend a FtP before or after invoking your Aptitude (see page 28), meaning it’s possible to reroll more than once or even combine another FtP effect with an Aptitude.`,
    ap: 0,
    level: 3,
    prerequisite: `Not Disadvantage Incompetent with the skill, no more than three Aptitudes per character`,
    isDisadvantage: false,
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    advantageId: 'bfc423f6-92c8-4fae-b0b9-0f5dbfa15ae5',
    name: `Basilisk Slayer`,
    rule: `Basilisk slayers are treated with tremendous respect. They are usually invited to high society celebrations and often receive free food and drink in taverns. Social standing for heroes with this advantage counts as being 2 points greater (see Core Rules Page 338). To receive this bonus, other people must know (or at least believe) that the hero is a basilisk slayer`,
    ap: 10,
    prerequisite: `The hero must have killed a Basilisk.`,
    isDisadvantage: false,
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    advantageId: '6fd22547-bc59-459e-b5cc-0dad4cf6345e',
    name: `Alcohol Intolerance`,
    rule: `Suffer double the effects from failed Poison checks after imbibing alcohol. For example, a hero that receives 1 level of Intoxicated, instead suffers 2 levels of Intoxicated.`,
    ap: -2,
    prerequisite: `Not Advantage Alcohol Tolerance`,
    isDisadvantage: true,
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    advantageId: 'a857125f-2b06-4033-b351-113f22cfa03b', // gets removed during e2e test 'successfully deletes the Advantage'
    name: `Bad Luck I-III`,
    rule: `The hero starts the game with one less FtP per level of this disadvantage. The hero’s maximum number of FtP drops, too, by one point per level of this disadvantage. The hero’s total number of FtP cannot be reduced below 0.`,
    ap: -10,
    level: 3,
    prerequisite: `Not Advantage Luck`,
    isDisadvantage: true,
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    advantageId: '813f455c-1b56-4086-8c28-e04099168a07', // gets removed during e2e test 'returns 403 for User role when trying to delete Advantage of another user'
    name: `Blind`,
    rule: `This disadvantage makes many skills difficult or impossible. The same goes for special abilities. The GM decides which penalties to apply to which checks. This kind of blindness can only be healed by a Great Miracle (see Core Rules page 315). While so afflicted, the hero has the state of blind`,
    ap: -50,
    prerequisite: `Not Advantage Exceptional Sense (Sight), Not Disadvantage Color-Blind, Not disadvantage Maimed (One-Eyed), Not Disadvantage Night-Blind, Not Disadvantage Restricted Sense (Sight)`,
    isDisadvantage: true,
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    advantageId: '6660d7fb-2415-4c13-a2aa-df328e4dc8d7', // gets removed during e2e test 'DELETE /Advantages/:id'
    name: `Brittle None`,
    rule: `Your character's Wound Threshold by 1.`,
    ap: -3,
    prerequisite: ``,
    isDisadvantage: true,
    sourceTag: sourceTags[0],
    createdBy: users[2], // admin
  },
  {
    advantageId: `131a3234-88a1-4fbc-b389-ad95c8c5f431`,
    name: `Space Sick`,
    rule: `Penalty of -1 to any actions and check done while in small spacecraft and areas close to open space. -2 penalty while on EVAs`,
    ap: 15,
    prerequisite: ``,
    isDisadvantage: true,
    sourceTag: sourceTags[2],
    createdBy: users[0], // user 1
  },
  {
    advantageId: `6027b8ba-b4eb-4f44-a82d-8a2135285838`, // gets removed during e2e test 'returns 200 for User role when trying to delete their own Advantage'
    name: `Millenial`,
    rule: `Laser, caster and energy-based weapons get +1 to attack and defense, swords and ballistic weapons get -1 AT`,
    ap: 20,
    prerequisite: `Not Advantage Stuck in the past, Not Advantage Old Fashioned`,
    isDisadvantage: true,
    sourceTag: sourceTags[2],
    createdBy: users[0], // user 1
  },
  {
    advantageId: `f2a1be91-f709-4295-87ed-b9acea3e317c`,
    name: `Old Fasioned`,
    rule: `Swords and old-style ballistic weapons get +1 attack and defense penalty, new technology gets -1 AT`,
    ap: 0,
    prerequisite: `Not Advantage Millenial`,
    isDisadvantage: false,
    sourceTag: sourceTags[2],
    createdBy: users[1], // user 2
  },
];
