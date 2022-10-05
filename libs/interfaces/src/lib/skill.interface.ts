import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty } from 'class-validator';
import { ICreatedBy } from './base.interface';
import { ISourceTag } from './source-tag.interface';

export interface ISkill extends ICreatedBy {
  skillId: string;
  name: string;
  check: string;
  quality: string;
  failedCheck: string;
  criticalSuccess: string;
  botch: string;
  improvementCost: string;
  applications: string;
  uses: string;
  newApplication: string;
  category: string;
  sourceTag?: ISourceTag;
}

export interface ICreateSkillRequest {
  name: string;
  check: string;
  quality: string;
  failedCheck: string;
  criticalSuccess: string;
  botch: string;
  improvementCost: string;
  applications: string;
  uses: string;
  newApplication: string;
  category: string;
  sourceTagId: string;
}

export class CreateSkillRequest implements ICreateSkillRequest {
  @ApiModelProperty({ example: 'Body Control' })
  @IsNotEmpty()
  name!: string;
  @ApiModelProperty({
    example: 'AGI/AGI/CON',
  })
  @IsNotEmpty()
  check!: string;
  @ApiModelProperty({
    example: 'the adventurer can more quickly squirm out of restraints.',
  })
  @IsNotEmpty()
  quality!: string;
  @ApiModelProperty({
    example:
      'the action fails partially, requires more time, or leads to mistakes, perhaps forcing the hero to abort the action.',
  })
  @IsNotEmpty()
  failedCheck!: string;
  @ApiModelProperty({
    example:
      'the action succeeds and the hero still has another action remaining. Whatever was attempted, the hero looked very graceful.',
  })
  @IsNotEmpty()
  criticalSuccess!: string;
  @ApiModelProperty({
    example:
      'the hero falls down and suffers an injury (1D6 DP, ignoring PRO).',
  })
  @IsNotEmpty()
  botch!: string;
  @ApiModelProperty({ example: 'D' })
  @IsNotEmpty()
  improvementCost!: string;
  @ApiModelProperty({
    example: 'Acrobatics, Balance, Combat Maneuver, Jumping, Running, Squirm',
  })
  @IsNotEmpty()
  applications!: string;
  @ApiModelProperty({ example: 'Tumbling' })
  @IsNotEmpty()
  uses!: string;
  @ApiModelProperty({ example: 'Skiing' })
  @IsNotEmpty()
  newApplication!: string;
  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @IsNotEmpty()
  sourceTagId!: string;
  @ApiModelProperty({ example: 'Combat' })
  @IsNotEmpty()
  category!: string;
}
