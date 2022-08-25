import {
  ICreateSpecialAbilityRequest,
  IJwtInfo,
  ISpecialAbility,
  Role,
} from '@igikanam/interfaces';
import { SpecialAbility } from '@igikanam/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SourceTagsService } from '../source-tags/source-tags.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SpecialAbilitiesService {
  constructor(
    @InjectRepository(SpecialAbility)
    private readonly specialAbilityRepo: Repository<SpecialAbility>,
    private readonly sourceTagsService: SourceTagsService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Find all Special Ability entities.
   * @returns Array of entities.
   */
  async findAll(): Promise<SpecialAbility[]> {
    return this.specialAbilityRepo.find({
      relations: ['createdBy', 'sourceTag'],
    });
  }

  /**
   * Find all Special Ability entities of given user.
   * @returns Array of entities.
   */
  async findAllOfUser(createdBy: IJwtInfo): Promise<SpecialAbility[]> {
    return this.specialAbilityRepo.find({
      where: { createdBy: { userId: createdBy.userId } },
      relations: ['createdBy', 'sourceTag'],
    });
  }

  /**
   * Find a singular specialAbility by their id.
   * @param id id of the specialAbility.
   * @returns specialAbility or undefined.
   */
  async findOne(
    id: string,
    user: IJwtInfo
  ): Promise<SpecialAbility | undefined> {
    const foundSpecialAbility = await this.specialAbilityRepo.findOneOrFail({
      where: {
        abilityId: id,
      },
      relations: ['createdBy', 'sourceTag'],
    });
    if (user.role !== Role.admin && foundSpecialAbility.createdBy !== user) {
      throw new ForbiddenException();
    }
    return foundSpecialAbility;
  }

  /**
   * Create and persist a Special Ability entity.
   * @param request information for Special Ability entity creation.
   * @returns created Special Ability.
   */
  async create(
    request: ICreateSpecialAbilityRequest,
    createdBy: IJwtInfo
  ): Promise<ISpecialAbility> {
    const { name, rule, prerequisites, apValue, level, sourceTagId, category } =
      request;
    const sourceTag = await this.sourceTagsService.findOne(
      sourceTagId,
      createdBy
    );
    const user = await this.usersService.findOne(createdBy.email);
    const newSpecialAbility = this.specialAbilityRepo.create({
      name,
      rule,
      prerequisites,
      apValue,
      level,
      category,
    });
    newSpecialAbility.createdBy = user;
    newSpecialAbility.sourceTag = sourceTag;
    return this.specialAbilityRepo.save(newSpecialAbility);
  }

  /**
   * Delete a specific entity by its id.
   * @param id id of the entity.
   * @returns void or EntityNotFound error.
   */
  async perish(id: string, user: IJwtInfo): Promise<void> {
    await this.findOne(id, user); // verify it exists and belongs to the given user
    const response = await this.specialAbilityRepo.delete({
      abilityId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(SpecialAbility, id);
    }
  }
}
