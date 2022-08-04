import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty } from 'class-validator';
import { ICreatedBy } from './base.interface';
import { ISourceTag } from './source-tag.interface';

export interface ISpecialAbility extends ICreatedBy {
  name: string;
  rule: string;
  prerequisites: string;
  apValue: number;
  level?: number;
  source: ISourceTag;
  category: string;
}

export interface ICreateSpecialAbilityRequest {
  name: string;
  rule: string;
  prerequisites: string;
  apValue: number;
  level?: number;
  sourceTagId: string;
  category: string;
}

export class CreateSpecialAbilityRequest
  implements ICreateSpecialAbilityRequest
{
  @ApiModelProperty({ example: 'Improve Attack' })
  @IsNotEmpty()
  name!: string;
  @ApiModelProperty({
    example: 'Heroes can use FtP to improve their Attack results.',
  })
  @IsNotEmpty()
  rule!: string;
  @ApiModelProperty({ example: 'Strength 69' })
  @IsNotEmpty()
  prerequisites!: string;
  @ApiModelProperty({ example: 10 })
  @IsNotEmpty()
  apValue!: number;
  @ApiModelProperty({ example: 2 })
  @IsNotEmpty()
  level?: number;
  @ApiModelProperty({ example: '62ebb7c4bb0c7328b1e712f7' })
  @IsNotEmpty()
  sourceTagId: string;
  @ApiModelProperty({ example: 'Combat' })
  @IsNotEmpty()
  category!: string;
}
