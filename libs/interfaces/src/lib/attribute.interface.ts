import { IBase } from './base.interface';

export interface IAttribute extends IBase {
  attributeId: string;
  name: string;
  value: number;
}
