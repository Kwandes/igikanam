import { ISpecialAbility } from '@igikanam/interfaces';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatedBy } from './created-by.entity';
import { SourceTag } from './source-tag.entity';

@Entity('special-abilities')
export class SpecialAbility extends CreatedBy implements ISpecialAbility {
  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @PrimaryGeneratedColumn('uuid')
  abilityId!: string;

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
  @ManyToOne(() => SourceTag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sourceTag' })
  sourceTag?: SourceTag;

  @ApiModelProperty()
  @Column()
  category!: string;
}
