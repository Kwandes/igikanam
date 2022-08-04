import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty } from 'class-validator';
import { ICreatedBy } from './base.interface';

export interface ISourceTag extends ICreatedBy {
  name: string;
}

export interface ICreateSourceTagRequest {
  name: string;
}
export class CreateSourceTagRequest implements ICreateSourceTagRequest {
  @ApiModelProperty({ example: 'Combat' })
  @IsNotEmpty()
  name!: string;
}
