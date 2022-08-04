import { SourceTag, SpecialAbility } from '@igikanam/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceTagsService } from '../source-tags/source-tags.service';
import { SpecialAbilitiesController } from './special-abilities.controller';
import { SpecialAbilitiesService } from './special-abilities.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialAbility, SourceTag])],
  controllers: [SpecialAbilitiesController],
  providers: [SpecialAbilitiesService, SourceTagsService],
  exports: [SpecialAbilitiesService],
})
export class SpecialAbilitiesModule {}
