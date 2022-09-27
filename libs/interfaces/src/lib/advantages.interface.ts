import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ICreatedBy } from './base.interface';
import { ISourceTag } from './source-tag.interface';

export interface IAdvantage extends ICreatedBy {
  advantageId: string;
  name: string;
  rule: string;
  ap: number;
  level?: number;
  prerequisite: string;
  isDisadvantage: boolean;
  sourceTag?: ISourceTag;
}

export interface ICreateAdvantageRequest {
  name: string;
  rule: string;
  ap: number;
  level?: number;
  prerequisite: string;
  isDisadvantage: boolean;
  sourceTagId: string;
}

export class CreateAdvantageRequest implements ICreateAdvantageRequest {
  @ApiModelProperty({
    example: 'Weak Astral Body',
  })
  @IsNotEmpty()
  name: string;
  @ApiModelProperty({
    example: `The hero loses one additional AE whenever required to spend AE.`,
  })
  @IsNotEmpty()
  rule: string;
  @ApiModelProperty({ example: -15 })
  @IsNotEmpty()
  ap: number;
  @ApiModelProperty({
    description: 'How many levels were taken in the given advantage.',
    example: 2,
  })
  @IsNotEmpty()
  @IsPositive()
  level?: number;
  @ApiModelProperty({ example: 'Advantage Spellcaster' })
  @IsString()
  prerequisite: string;
  @ApiModelProperty({ example: true })
  @IsNotEmpty()
  isDisadvantage: boolean;
  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @IsNotEmpty()
  sourceTagId!: string;
}
