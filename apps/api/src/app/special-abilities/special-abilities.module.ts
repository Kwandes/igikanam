import { SourceTag, SpecialAbility, User } from '@igikanam/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceTagsService } from '../source-tags/source-tags.service';
import { UsersService } from '../users/users.service';
import { SpecialAbilitiesController } from './special-abilities.controller';
import { SpecialAbilitiesService } from './special-abilities.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialAbility, SourceTag, User])],
  controllers: [SpecialAbilitiesController],
  providers: [SpecialAbilitiesService, SourceTagsService, UsersService],
  exports: [SpecialAbilitiesService],
})
export class SpecialAbilitiesModule {}
