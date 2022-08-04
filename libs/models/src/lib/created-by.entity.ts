import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

// base.entity.ts
export abstract class CreatedBy extends Base {
  @ApiModelProperty()
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  createdBy?: User;
}
