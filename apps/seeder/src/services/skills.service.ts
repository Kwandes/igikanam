import { ISkill } from '@igikanam/interfaces';
import { Skill } from '@igikanam/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { skills } from '../constants/skills.constant';

@Injectable()
export class SkillsSeederService {
  constructor(
    @InjectRepository(Skill)
    private readonly repo: Repository<Skill>
  ) {}

  create(): Array<Promise<Skill>> {
    return skills.map(async (entity: ISkill) => {
      try {
        return await this.repo.save(entity);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
