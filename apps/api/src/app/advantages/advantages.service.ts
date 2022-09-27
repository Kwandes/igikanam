import {
  IAdvantage,
  ICreateAdvantageRequest,
  IJwtInfo,
  Role,
} from '@igikanam/interfaces';
import { Advantage } from '@igikanam/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SourceTagsService } from '../source-tags/source-tags.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdvantagesService {
  constructor(
    @InjectRepository(Advantage)
    private readonly advantageRepo: Repository<Advantage>,
    private readonly sourceTagsService: SourceTagsService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Find all Advantage entities.
   * @returns Array of entities.
   */
  async findAll(): Promise<Advantage[]> {
    return this.advantageRepo.find({
      relations: ['createdBy', 'sourceTag'],
    });
  }

  /**
   * Find all Advantage entities of given user.
   * @returns Array of entities.
   */
  async findAllOfUser(createdBy: IJwtInfo): Promise<Advantage[]> {
    return this.advantageRepo.find({
      where: { createdBy: { userId: createdBy.userId } },
      relations: ['createdBy', 'sourceTag'],
    });
  }

  /**
   * Find a singular advantage by their id.
   * @param id id of the advantage.
   * @returns advantage or undefined.
   */
  async findOne(id: string, user: IJwtInfo): Promise<Advantage | undefined> {
    const foundAdvantage = await this.advantageRepo.findOneOrFail({
      where: {
        advantageId: id,
      },
      relations: ['createdBy', 'sourceTag'],
    });
    if (
      user.role !== Role.admin &&
      foundAdvantage.sourceTag.name !== 'default' &&
      foundAdvantage.createdBy.userId !== user.userId
    ) {
      throw new ForbiddenException();
    }
    return foundAdvantage;
  }

  /**
   * Create and persist a Advantage entity.
   * @param request information for Advantage entity creation.
   * @returns created Advantage.
   */
  async create(
    request: ICreateAdvantageRequest,
    createdBy: IJwtInfo
  ): Promise<IAdvantage> {
    const { name, rule, ap, level, prerequisite, isDisadvantage, sourceTagId } =
      request;
    const sourceTag = await this.sourceTagsService.findOne(
      sourceTagId,
      createdBy
    );
    const user = await this.usersService.findOne(createdBy.email);
    const newAdvantage = this.advantageRepo.create({
      name,
      rule,
      ap,
      level,
      prerequisite,
      isDisadvantage,
    });
    newAdvantage.createdBy = user;
    newAdvantage.sourceTag = sourceTag;
    return this.advantageRepo.save(newAdvantage);
  }

  /**
   * Delete a specific entity by its id.
   * @param id id of the entity.
   * @returns void or EntityNotFound error.
   */
  async perish(id: string, user: IJwtInfo): Promise<void> {
    const found = await this.findOne(id, user); // verify it exists and belongs to the given user
    if (
      found.sourceTag.name === 'default' &&
      found.createdBy.userId !== user.userId
    ) {
      throw new ForbiddenException();
    }
    const response = await this.advantageRepo.delete({
      advantageId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(Advantage, id);
    }
  }
}
