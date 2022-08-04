import { IBase } from './base.interface';
import { ISourceTag } from './source-tag.interface';

export interface ISkill extends IBase {
  name: string;
  check: string;
  quality: string;
  failedCheck: string;
  criticalSuccess: string;
  botch: string;
  improvementCost: string;
  applications: string;
  uses: string;
  newApplication: string;
  category: string;
  source: ISourceTag;
  userId: string;
}
