import { ICombatTechnique } from '@igikanam/interfaces';
import { CombatTechnique } from '@igikanam/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { combatTechniques } from '../constants/combat-techniques.constant';

@Injectable()
export class CombatTechniquesSeederService {
  constructor(
    @InjectRepository(CombatTechnique)
    private readonly repo: Repository<CombatTechnique>
  ) {}

  create(): Array<Promise<CombatTechnique>> {
    return combatTechniques.map(async (entity: ICombatTechnique) => {
      try {
        return await this.repo.save(entity);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
