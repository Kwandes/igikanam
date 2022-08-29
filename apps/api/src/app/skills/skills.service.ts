import {
  ICreateSkillRequest,
  IJwtInfo,
  ISkill,
  Role,
} from '@igikanam/interfaces';
import { Skill } from '@igikanam/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SourceTagsService } from '../source-tags/source-tags.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,
    private readonly sourceTagsService: SourceTagsService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Find all Skill entities.
   * @returns Array of entities.
   */
  async findAll(): Promise<Skill[]> {
    return this.skillRepo.find({
      relations: ['createdBy', 'sourceTag'],
    });
  }

  /**
   * Find all Skill entities of given user.
   * @returns Array of entities.
   */
  async findAllOfUser(createdBy: IJwtInfo): Promise<Skill[]> {
    return this.skillRepo.find({
      where: { createdBy: { userId: createdBy.userId } },
      relations: ['createdBy', 'sourceTag'],
    });
  }

  /**
   * Find a singular skill by their id.
   * @param id id of the skill.
   * @returns skill or undefined.
   */
  async findOne(id: string, user: IJwtInfo): Promise<Skill | undefined> {
    const foundSkill = await this.skillRepo.findOneOrFail({
      where: {
        skillId: id,
      },
      relations: ['createdBy', 'sourceTag'],
    });
    if (
      user.role !== Role.admin &&
      foundSkill.sourceTag.name !== 'default' &&
      foundSkill.createdBy.userId !== user.userId
    ) {
      throw new ForbiddenException();
    }
    return foundSkill;
  }

  /**
   * Create and persist a Skill entity.
   * @param request information for Skill entity creation.
   * @returns created Skill.
   */
  async create(
    request: ICreateSkillRequest,
    createdBy: IJwtInfo
  ): Promise<ISkill> {
    const {
      name,
      check,
      quality,
      failedCheck,
      criticalSuccess,
      botch,
      improvementCost,
      applications,
      uses,
      newApplication,
      sourceTagId,
      category,
    } = request;
    const sourceTag = await this.sourceTagsService.findOne(
      sourceTagId,
      createdBy
    );
    const user = await this.usersService.findOne(createdBy.email);
    const newSkill = this.skillRepo.create({
      name,
      check,
      quality,
      failedCheck,
      criticalSuccess,
      botch,
      improvementCost,
      applications,
      uses,
      newApplication,
      category,
    });
    newSkill.createdBy = user;
    newSkill.sourceTag = sourceTag;
    return this.skillRepo.save(newSkill);
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
    const response = await this.skillRepo.delete({
      skillId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(Skill, id);
    }
  }
}
