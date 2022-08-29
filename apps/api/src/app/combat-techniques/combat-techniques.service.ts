import {
  ICombatTechnique,
  ICreateCombatTechniqueRequest,
  IJwtInfo,
  Role,
} from '@igikanam/interfaces';
import { CombatTechnique } from '@igikanam/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SourceTagsService } from '../source-tags/source-tags.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CombatTechniquesService {
  constructor(
    @InjectRepository(CombatTechnique)
    private readonly combatTechniqueRepo: Repository<CombatTechnique>,
    private readonly sourceTagsService: SourceTagsService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Find all CombatTechnique entities.
   * @returns Array of entities.
   */
  async findAll(): Promise<CombatTechnique[]> {
    return this.combatTechniqueRepo.find({
      relations: ['createdBy', 'sourceTag'],
    });
  }

  /**
   * Find all CombatTechnique entities of given user.
   * @returns Array of entities.
   */
  async findAllOfUser(createdBy: IJwtInfo): Promise<CombatTechnique[]> {
    return this.combatTechniqueRepo.find({
      where: { createdBy: { userId: createdBy.userId } },
      relations: ['createdBy', 'sourceTag'],
    });
  }

  /**
   * Find a singular combatTechnique by their id.
   * @param id id of the combatTechnique.
   * @returns combatTechnique or undefined.
   */
  async findOne(
    id: string,
    user: IJwtInfo
  ): Promise<CombatTechnique | undefined> {
    const foundCombatTechnique = await this.combatTechniqueRepo.findOneOrFail({
      where: {
        combatTechniqueId: id,
      },
      relations: ['createdBy', 'sourceTag'],
    });
    if (
      user.role !== Role.admin &&
      foundCombatTechnique.sourceTag.name !== 'default' &&
      foundCombatTechnique.createdBy.userId !== user.userId
    ) {
      throw new ForbiddenException();
    }
    return foundCombatTechnique;
  }

  /**
   * Create and persist a CombatTechnique entity.
   * @param request information for CombatTechnique entity creation.
   * @returns created CombatTechnique.
   */
  async create(
    request: ICreateCombatTechniqueRequest,
    createdBy: IJwtInfo
  ): Promise<ICombatTechnique> {
    const {
      name,
      rating,
      improvementCost,
      primaryAttribute,
      sourceTagId,
      category,
    } = request;
    const sourceTag = await this.sourceTagsService.findOne(
      sourceTagId,
      createdBy
    );
    const user = await this.usersService.findOne(createdBy.email);
    const newCombatTechnique = this.combatTechniqueRepo.create({
      name,
      rating,
      improvementCost,
      primaryAttribute,
      category,
    });
    newCombatTechnique.createdBy = user;
    newCombatTechnique.sourceTag = sourceTag;
    return this.combatTechniqueRepo.save(newCombatTechnique);
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
    const response = await this.combatTechniqueRepo.delete({
      combatTechniqueId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(CombatTechnique, id);
    }
  }
}
