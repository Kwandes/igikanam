import { IBase } from '@igikanam/interfaces';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { CreateDateColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

// base.entity.ts
export abstract class Base implements IBase {
  @ApiModelProperty({ example: '62ebb7c4bb0c7328b1e712f7' })
  @ObjectIdColumn()
  id!: string;

  @ApiModelProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiModelProperty()
  @UpdateDateColumn()
  updatedAt?: Date;
}
