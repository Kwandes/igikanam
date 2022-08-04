import {
  ICreateSpecialAbilityRequest,
  ISpecialAbility,
  IUser,
  Role,
} from '@igikanam/interfaces';
import { SpecialAbility } from '@igikanam/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, ObjectID, Repository } from 'typeorm';
import { SourceTagsService } from '../source-tags/source-tags.service';

@Injectable()
export class SpecialAbilitiesService {
  constructor(
    @InjectRepository(SpecialAbility)
    private readonly specialAbilityRepo: Repository<SpecialAbility>,
    private readonly sourceTagsService: SourceTagsService
  ) {}

  /**
   * Find all Special Ability entities.
   * @returns Array of entities.
   */
  async findAll(): Promise<SpecialAbility[]> {
    return this.specialAbilityRepo.find();
  }

  /**
   * Find all Special Ability entities of given user.
   * @returns Array of entities.
   */
  async findAllOfUser(user: IUser): Promise<SpecialAbility[]> {
    return this.specialAbilityRepo.find({ where: user });
  }

  /**
   * Find a singular specialAbility by their id.
   * @param id id of the specialAbility.
   * @returns specialAbility or undefined.
   */
  async findOne(id: string, user: IUser): Promise<SpecialAbility | undefined> {
    const foundSpecialAbility = await this.specialAbilityRepo.findOne({
      where: {
        _id: new ObjectID(id),
      },
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
    createdBy: IUser
  ): Promise<ISpecialAbility> {
    const { name, rule, prerequisites, apValue, level, sourceTagId, category } =
      request;
    const sourceTag = await this.sourceTagsService.findOne(
      new ObjectID(sourceTagId),
      createdBy
    );
    const newSpecialAbility = this.specialAbilityRepo.create({
      name,
      rule,
      prerequisites,
      apValue,
      level,
      source: sourceTag,
      category,
      createdBy,
    });
    return this.specialAbilityRepo.save(newSpecialAbility);
  }

  /**
   * Delete a specific entity by its id.
   * @param id id of the entity.
   * @returns void or EntityNotFound error.
   */
  async perish(id: string, user): Promise<void> {
    await this.findOne(id, user); // verify it exists and belongs to the given user
    const response = await this.specialAbilityRepo.delete({
      _id: new ObjectID(id),
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(SpecialAbility, id);
    }
  }
}
