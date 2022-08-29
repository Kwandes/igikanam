import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty } from 'class-validator';
import { ICreatedBy } from './base.interface';
import { ISourceTag } from './source-tag.interface';

export interface ICombatTechnique extends ICreatedBy {
  combatTechniqueId: string;
  name: string;
  rating: number;
  improvementCost: string;
  primaryAttribute: string;
  category: string;
  sourceTag?: ISourceTag;
}

export interface ICreateCombatTechniqueRequest {
  name: string;
  rating: number;
  improvementCost: string;
  primaryAttribute: string;
  category: string;
  sourceTagId: string;
}

export class CreateCombatTechniqueRequest
  implements ICreateCombatTechniqueRequest
{
  @ApiModelProperty({ example: 'Polearms' })
  @IsNotEmpty()
  name!: string;
  @ApiModelProperty({ example: 6 })
  @IsNotEmpty()
  rating!: number;
  @ApiModelProperty({ example: 'D' })
  @IsNotEmpty()
  improvementCost!: string;
  @ApiModelProperty({ example: 'AGI/STR' })
  @IsNotEmpty()
  primaryAttribute!: string;
  @ApiModelProperty({ example: 'Melee' })
  @IsNotEmpty()
  category!: string;
  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @IsNotEmpty()
  sourceTagId!: string;
}
