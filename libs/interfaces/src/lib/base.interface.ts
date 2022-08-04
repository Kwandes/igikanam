import { IUser } from './user.interface';

export interface IBase {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreatedBy extends IBase {
  createdBy?: IUser;
}
