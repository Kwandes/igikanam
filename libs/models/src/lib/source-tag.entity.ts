import { ISourceTag } from '@igikanam/interfaces';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Column, Entity } from 'typeorm';
import { CreatedBy } from './created-by.entity';

@Entity('source-tags')
export class SourceTag extends CreatedBy implements ISourceTag {
  @ApiModelProperty()
  @Column()
  name!: string;
}
