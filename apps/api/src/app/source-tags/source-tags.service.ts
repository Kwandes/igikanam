import {
  ICreateSourceTagRequest,
  ISourceTag,
  IUser,
  Role,
} from '@igikanam/interfaces';
import { SourceTag } from '@igikanam/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, ObjectID, Repository } from 'typeorm';

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
  async findAllOfUser(user: IUser): Promise<SourceTag[]> {
    return this.sourceTagRepo.find({ where: user, relations: ['createdBy'] });
  }

  /**
   * Find a singular sourceTag by their id.
   * @param id id of the sourceTag.
   * @returns sourceTag or undefined.
   */
  async findOne(id: ObjectID, user: IUser): Promise<SourceTag | undefined> {
    const foundSourceTag = await this.sourceTagRepo.findOneOrFail({
      where: { _id: id },
      relations: ['createdBy'],
    });
    console.log('foundSourceTag', foundSourceTag);
    console.log('user', user);
    if (user.role !== Role.admin || foundSourceTag.createdBy._id !== user._id) {
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
    createdBy: IUser
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
  async perish(id: ObjectID, user): Promise<void> {
    await this.findOne(id, user); // verify it exists and belongs to the given user
    const response = await this.sourceTagRepo.delete({});

    if (response.affected === 0) {
      throw new EntityNotFoundError(SourceTag, id);
    }
  }
}
