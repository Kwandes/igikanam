import { IUser, Role } from '@igikanam/interfaces';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base implements IUser {
  @ApiModelProperty()
  @Column({ length: 254, unique: true })
  email!: string;

  @ApiModelProperty()
  @Column({ length: 120 })
  password!: string;

  @ApiModelProperty()
  @Column({ type: 'enum', enum: Role, default: Role.admin })
  role!: Role;
}
