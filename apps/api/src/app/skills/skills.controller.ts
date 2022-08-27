import {
  CreateSkillRequest,
  IJwtInfo,
  ISkill,
  Role,
} from '@igikanam/interfaces';
import { Skill } from '@igikanam/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { SkillsService } from './skills.service';

@ApiBearerAuth()
@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('')
  @ApiOperation({ summary: 'Get a list of all skills. Role: Admin' })
  @ApiOkResponse({ type: [Skill] })
  async getAll(): Promise<ISkill[]> {
    return this.skillsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Get('me')
  @ApiOperation({
    summary: 'Get a list of all skills of authenticated user',
  })
  @ApiOkResponse({ type: [Skill] })
  async getAllOfMe(@AuthUser() user: IJwtInfo): Promise<ISkill[]> {
    return this.skillsService.findAllOfUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a skill by id. Role: Admin' })
  @ApiOkResponse({ type: Skill })
  get(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: IJwtInfo
  ): Promise<ISkill> {
    return this.skillsService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Post('')
  @ApiOperation({
    summary:
      'Create a new skill entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: Skill })
  create(
    @Body() createSkillRequest: CreateSkillRequest,
    @AuthUser() user: IJwtInfo
  ): Promise<ISkill> {
    return this.skillsService.create(createSkillRequest, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific skill. Role: Admin',
  })
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: IJwtInfo
  ): Promise<void> {
    return this.skillsService.perish(id, user);
  }
}
