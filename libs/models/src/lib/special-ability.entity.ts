import { ISpecialAbility } from '@igikanam/interfaces';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Column, Entity } from 'typeorm';
import { CreatedBy } from './created-by.entity';
import { SourceTag } from './source-tag.entity';

@Entity('special-abilities')
export class SpecialAbility extends CreatedBy implements ISpecialAbility {
  @ApiModelProperty()
  @Column()
  name!: string;

  @ApiModelProperty()
  @Column()
  rule!: string;

  @ApiModelProperty()
  @Column()
  prerequisites!: string;

  @ApiModelProperty()
  @Column()
  apValue!: number;

  @ApiModelProperty()
  @Column()
  level?: number | undefined;

  @ApiModelProperty()
  @Column()
  source!: SourceTag;

  @ApiModelProperty()
  @Column()
  category!: string;
}
