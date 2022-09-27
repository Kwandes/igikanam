import { IAdvantage } from '@igikanam/interfaces';
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

@Entity('advantages')
export class Advantage extends CreatedBy implements IAdvantage {
  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @PrimaryGeneratedColumn('uuid')
  advantageId!: string;

  @ApiModelProperty({
    example: 'Weak Astral Body',
  })
  @Column()
  name!: string;

  @ApiModelProperty({
    example: `The hero loses one additional AE whenever required to spend AE.`,
  })
  @Column()
  rule!: string;

  @ApiModelProperty({ example: -15 })
  @Column()
  ap!: number;

  @ApiModelProperty({
    description: 'How many levels were taken in the given advantage.',
    example: 2,
  })
  @Column({ nullable: true })
  level?: number | undefined;

  @ApiModelProperty({ example: 'Advantage Spellcaster' })
  @Column()
  prerequisite!: string;

  @ApiModelProperty({ example: true })
  @Column()
  isDisadvantage!: boolean;

  @ApiModelProperty({ example: '80a0d2ac-ec67-482e-9017-909b72a74be7' })
  @Column()
  @ManyToOne(() => SourceTag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sourceTag' })
  sourceTag?: SourceTag;
}
