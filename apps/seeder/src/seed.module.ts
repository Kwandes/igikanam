import {
  CombatTechnique,
  Skill,
  SourceTag,
  SpecialAbility,
  User,
} from '@igikanam/models';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config.service';
import { SeedService } from './seed.service';
import { CombatTechniquesSeederService } from './services/combat-techniques.service';
import { SkillsSeederService } from './services/skills.service';
import { SourceTagsSeederService } from './services/source-tags.service';
import { SpecialAbilitiesSeederService } from './services/special-abilties.service';
import { UsersSeederService } from './services/users.service';

@Module({})
export class SeedModule {
  public static register(): DynamicModule {
    return {
      module: SeedModule,
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([
          User,
          SourceTag,
          SpecialAbility,
          Skill,
          CombatTechnique,
        ]),
      ],
      providers: [
        Logger,
        SeedService,
        UsersSeederService,
        SourceTagsSeederService,
        SpecialAbilitiesSeederService,
        SkillsSeederService,
        CombatTechniquesSeederService,
      ],
      exports: [SeedService],
    };
  }
}
