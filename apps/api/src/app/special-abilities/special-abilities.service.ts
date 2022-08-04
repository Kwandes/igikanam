import {
  ICreateSpecialAbilityRequest,
  ISpecialAbility,
  IUser,
} from '@igikanam/interfaces';
import { SpecialAbility } from '@igikanam/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
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
   * Find a singular specialAbility by their id.
   * @param id id of the specialAbility.
   * @returns specialAbility or undefined.
   */
  async findOne(id: string): Promise<SpecialAbility | undefined> {
    return this.specialAbilityRepo.findOne({ where: { id } });
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
    const sourceTag = await this.sourceTagsService.findOne(sourceTagId);
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
  async perish(id: string): Promise<void> {
    const response = await this.specialAbilityRepo.delete({
      id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(SpecialAbility, id);
    }
  }
}
