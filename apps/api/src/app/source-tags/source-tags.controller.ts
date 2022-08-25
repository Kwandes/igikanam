import {
  CreateSourceTagRequest,
  IJwtInfo,
  ISourceTag,
  Role,
} from '@igikanam/interfaces';
import { SourceTag } from '@igikanam/models';
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
import { SourceTagsService } from './source-tags.service';

@ApiBearerAuth()
@ApiTags('Source Tags')
@Controller('source-tags')
export class SourceTagsController {
  constructor(private readonly sourceTagsService: SourceTagsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('')
  @ApiOperation({ summary: 'Get a list of all sourceTags. Role: Admin' })
  @ApiOkResponse({ type: [SourceTag] })
  async getAll(): Promise<ISourceTag[]> {
    return this.sourceTagsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Get('me')
  @ApiOperation({
    summary: 'Get a list of all sourceTags of authenticated user',
  })
  @ApiOkResponse({ type: [SourceTag] })
  async getAllOfMe(@AuthUser() user: IJwtInfo): Promise<ISourceTag[]> {
    return this.sourceTagsService.findAllOfUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a sourceTag by id. Role: Admin' })
  @ApiOkResponse({ type: SourceTag })
  get(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: IJwtInfo
  ): Promise<ISourceTag> {
    return this.sourceTagsService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Post('')
  @ApiOperation({
    summary:
      'Create a new sourceTag entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: SourceTag })
  create(
    @Body() createSourceTagRequest: CreateSourceTagRequest,
    @AuthUser() user: IJwtInfo
  ): Promise<ISourceTag> {
    return this.sourceTagsService.create(createSourceTagRequest, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific sourceTag. Role: Admin',
  })
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: IJwtInfo
  ): Promise<void> {
    return this.sourceTagsService.perish(id, user);
  }
}
