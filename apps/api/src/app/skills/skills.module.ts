import { Skill, SourceTag, User } from '@igikanam/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceTagsService } from '../source-tags/source-tags.service';
import { UsersService } from '../users/users.service';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, SourceTag, User])],
  controllers: [SkillsController],
  providers: [SkillsService, SourceTagsService, UsersService],
  exports: [SkillsService],
})
export class SkillsModule {}
