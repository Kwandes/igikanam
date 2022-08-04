import { IBase } from './base.interface';
import { ISourceTag } from './source-tag.interface';

export interface ISpecialAbility extends IBase {
  name: string;
  rule: string;
  prerequisites: string;
  apValue: number;
  level?: number;
  source: ISourceTag;
  category: string;
  userId: string;
}
