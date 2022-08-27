import { ISkill } from '@igikanam/interfaces';
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

@Entity('skills')
export class Skill extends CreatedBy implements ISkill {
  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @PrimaryGeneratedColumn('uuid')
  skillId!: string;

  @ApiModelProperty({ example: 'Body Control' })
  @Column()
  name!: string;

  @ApiModelProperty({
    example: 'AGI/AGI/CON',
  })
  @Column()
  check!: string;

  @ApiModelProperty({
    example: 'the adventurer can more quickly squirm out of restraints.',
  })
  @Column()
  quality!: string;

  @ApiModelProperty({
    example:
      'the action fails partially, requires more time, or leads to mistakes, perhaps forcing the hero to abort the action.',
  })
  @Column()
  failedCheck!: string;

  @ApiModelProperty({
    example:
      'the action succeeds and the hero still has another action remaining. Whatever was attempted, the hero looked very graceful.',
  })
  @Column()
  criticalSuccess!: string;

  @ApiModelProperty({
    example:
      'the hero falls down and suffers an injury (1D6 DP, ignoring PRO).',
  })
  @Column()
  botch!: string;

  @ApiModelProperty({ example: 'D' })
  @Column()
  improvementCost!: string;

  @ApiModelProperty({
    example: 'Acrobatics, Balance, Combat Maneuver, Jumping, Running, Squirm',
  })
  @Column()
  applications!: string;

  @ApiModelProperty({ example: 'Tumbling' })
  @Column()
  uses!: string;

  @ApiModelProperty({ example: 'Skiing' })
  @Column()
  newApplication!: string;

  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @Column()
  @ManyToOne(() => SourceTag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sourceTag' })
  sourceTag?: SourceTag;

  @ApiModelProperty({ example: 'Combat' })
  @Column()
  category!: string;
}
