import { CombatTechnique, SourceTag, User } from '@igikanam/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceTagsService } from '../source-tags/source-tags.service';
import { UsersService } from '../users/users.service';
import { CombatTechniquesController } from './combat-technique.controller';
import { CombatTechniquesService } from './combat-techniques.service';

@Module({
  imports: [TypeOrmModule.forFeature([CombatTechnique, SourceTag, User])],
  controllers: [CombatTechniquesController],
  providers: [CombatTechniquesService, SourceTagsService, UsersService],
  exports: [CombatTechniquesService],
})
export class CombatTechniquesModule {}
