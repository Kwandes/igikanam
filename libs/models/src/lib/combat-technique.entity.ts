import { ICombatTechnique } from '@igikanam/interfaces';
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

@Entity('combatTechniques')
export class CombatTechnique extends CreatedBy implements ICombatTechnique {
  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @PrimaryGeneratedColumn('uuid')
  combatTechniqueId!: string;

  @ApiModelProperty({ example: 'Polearms' })
  @Column()
  name!: string;

  @ApiModelProperty({ example: 6 })
  @Column()
  rating!: number;

  @ApiModelProperty({ example: 'D' })
  @Column()
  improvementCost!: string;

  @ApiModelProperty({ example: 'AGI/STR' })
  @Column()
  primaryAttribute!: string;

  @ApiModelProperty({ example: 'Melee' })
  @Column()
  category!: string;

  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @Column()
  @ManyToOne(() => SourceTag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sourceTag' })
  sourceTag?: SourceTag;
}
