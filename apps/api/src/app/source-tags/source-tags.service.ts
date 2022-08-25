import {
  ICreateSourceTagRequest,
  IJwtInfo,
  ISourceTag,
  Role,
} from '@igikanam/interfaces';
import { SourceTag } from '@igikanam/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
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
    return this.sourceTagRepo.find({ relations: ['createdBy'] });
  }

  /**
   * Find all Special Ability entities of given user.
   * @returns Array of entities.
   */
  async findAllOfUser(createdBy: IJwtInfo): Promise<SourceTag[]> {
    return this.sourceTagRepo.find({
      where: { createdBy: { userId: createdBy.userId } },
      relations: ['createdBy'],
    });
  }

  /**
   * Find a singular sourceTag by their id.
   * @param id id of the sourceTag.
   * @returns sourceTag or undefined.
   */
  async findOne(id: string, user: IJwtInfo): Promise<SourceTag | undefined> {
    const foundSourceTag = await this.sourceTagRepo.findOneOrFail({
      where: { tagId: id },
      relations: ['createdBy'],
    });
    if (
      user.role !== Role.admin ||
      foundSourceTag.createdBy.userId !== user.userId
    ) {
      throw new ForbiddenException();
    }
    return foundSourceTag;
  }

  /**
   * Create and persist a Special Ability entity.
   * @param request information for Special Ability entity creation.
   * @returns created Special Ability.
   */
  async create(
    request: ICreateSourceTagRequest,
    createdBy: IJwtInfo
  ): Promise<ISourceTag> {
    const { name } = request;
    console.log('createdBy', createdBy);
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
  async perish(id: string, user: IJwtInfo): Promise<void> {
    await this.findOne(id, user); // verify it exists and belongs to the given user
    const response = await this.sourceTagRepo.delete({ tagId: id });

    if (response.affected === 0) {
      throw new EntityNotFoundError(SourceTag, id);
    }
  }
}
