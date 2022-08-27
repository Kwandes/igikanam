import { ISourceTag } from '@igikanam/interfaces';
import { SourceTag } from '@igikanam/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sourceTags } from '../constants/source-tags.constant';

@Injectable()
export class SourceTagsSeederService {
  constructor(
    @InjectRepository(SourceTag)
    private readonly repo: Repository<SourceTag>
  ) {}

  create(): Array<Promise<SourceTag>> {
    return sourceTags.map(async (entity: ISourceTag) => {
      try {
        return await this.repo.save(entity);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
