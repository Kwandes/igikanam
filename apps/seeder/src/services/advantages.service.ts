import { IAdvantage } from '@igikanam/interfaces';
import { Advantage } from '@igikanam/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { advantages } from '../constants/advantages.constant';

@Injectable()
export class AdvantagesSeederService {
  constructor(
    @InjectRepository(Advantage)
    private readonly repo: Repository<Advantage>
  ) {}

  create(): Array<Promise<Advantage>> {
    return advantages.map(async (entity: IAdvantage) => {
      try {
        return await this.repo.save(entity);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
