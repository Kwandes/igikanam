import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { LoggerMiddleware } from './middleware/logging.middleware';
import { SkillsModule } from './skills/skills.module';
import { SourceTagsModule } from './source-tags/source-tags.module';
import { SpecialAbilitiesModule } from './special-abilities/special-abilities.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    SourceTagsModule,
    SpecialAbilitiesModule,
    SkillsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
