import {
  ICreateSourceTagRequest,
  ISourceTag,
  IUser,
} from '@igikanam/interfaces';
import { SourceTag } from '@igikanam/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class SourceTagsService {
  constructor(
    @InjectRepository(SourceTag)
    private readonly sourceTagRepo: Repository<SourceTag>
  ) {}

  /**
   * Find all Special Ability entities.
   * @returns Array of entities.
   */
  async findAll(): Promise<SourceTag[]> {
    return this.sourceTagRepo.find();
  }

  /**
   * Find a singular sourceTag by their id.
   * @param id id of the sourceTag.
   * @returns sourceTag or undefined.
   */
  async findOne(id: string): Promise<SourceTag | undefined> {
    return this.sourceTagRepo.findOne({ where: { id } });
  }

  /**
   * Create and persist a Special Ability entity.
   * @param request information for Special Ability entity creation.
   * @returns created Special Ability.
   */
  async create(
    request: ICreateSourceTagRequest,
    createdBy: IUser
  ): Promise<ISourceTag> {
    const { name } = request;
    const newSourceTag = this.sourceTagRepo.create({
      name,
      createdBy,
    });
    return this.sourceTagRepo.save(newSourceTag);
  }

  /**
   * Delete a specific entity by its id.
   * @param id id of the entity.
   * @returns void or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.sourceTagRepo.delete({
      id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(SourceTag, id);
    }
  }
}
