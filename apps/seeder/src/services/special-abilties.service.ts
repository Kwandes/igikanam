import { ISpecialAbility } from '@igikanam/interfaces';
import { SpecialAbility } from '@igikanam/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialAbilities } from '../constants/special-abilities.constant';

@Injectable()
export class SpecialAbilitiesSeederService {
  constructor(
    @InjectRepository(SpecialAbility)
    private readonly repo: Repository<SpecialAbility>
  ) {}

  create(): Array<Promise<SpecialAbility>> {
    return SpecialAbilities.map(async (entity: ISpecialAbility) => {
      try {
        return await this.repo.save(entity);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
