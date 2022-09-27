import { Advantage, SourceTag, User } from '@igikanam/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceTagsService } from '../source-tags/source-tags.service';
import { UsersService } from '../users/users.service';
import { AdvantagesController } from './advantages.controller';
import { AdvantagesService } from './advantages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Advantage, SourceTag, User])],
  controllers: [AdvantagesController],
  providers: [AdvantagesService, SourceTagsService, UsersService],
  exports: [AdvantagesService],
})
export class AdvantagesModule {}
