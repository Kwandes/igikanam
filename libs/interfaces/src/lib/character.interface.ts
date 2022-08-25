import { IAttribute } from './attribute.interface';
import { ICreatedBy } from './base.interface';
import { ISkill } from './skill.interface';
import { ISourceTag } from './source-tag.interface';
import { ISpecialAbility } from './special-ability.interface';

export interface ICharacter extends ICreatedBy {
  characterId: string;
  totalAp: number;
  spentAp: number;
  personalData: {
    name: string;
    gender: string;
    race: string;
    culture: string;
    proffession?: string;
    family: string;
    placeOfBirth: string;
    dateOfBirth: string;
    age: number;
    hairColor: string;
    eyeColor: string;
    size: number;
    weight: number;
    title: string;
    socialStatus: string;
    characteristics: string;
    otherInformation: string;
    areaKnowledge: string;
  };
  attributes: {
    permanentLostLifePoints: number;
    permanentLostLArcaneEnergyPoints: number;
    addedLifePoint: number;
    addedArcaneEnergyPoints: number;
    boostedAttribute: string;
    attributes: IAttribute[];
  };
  advantages: [];
  disadvantages: [];
  skills: ISkill[];
  combatTechniques: [];
  specialAbilities: ISpecialAbility[];
  spells: [];
  equipment: [];
  extra: {
    customRules: [];
  };
  tags: ISourceTag[];
}
