import { SourceTag } from '@igikanam/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceTagsController } from './source-tags.controller';
import { SourceTagsService } from './source-tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([SourceTag])],
  controllers: [SourceTagsController],
  providers: [SourceTagsService],
  exports: [SourceTagsService],
})
export class SourceTagsModule {}
