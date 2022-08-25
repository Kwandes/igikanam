import { ISourceTag } from '@igikanam/interfaces';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedBy } from './created-by.entity';

@Entity('source-tags')
export class SourceTag extends CreatedBy implements ISourceTag {
  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @PrimaryGeneratedColumn('uuid')
  tagId!: string;

  @ApiModelProperty()
  @Column()
  name!: string;
}
