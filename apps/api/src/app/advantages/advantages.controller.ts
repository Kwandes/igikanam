import {
  CreateAdvantageRequest,
  IAdvantage,
  IJwtInfo,
  Role,
} from '@igikanam/interfaces';
import { Advantage } from '@igikanam/models';
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
import { AdvantagesService } from './advantages.service';

@ApiBearerAuth()
@ApiTags('Advantages')
@Controller('advantages')
export class AdvantagesController {
  constructor(private readonly advantagesService: AdvantagesService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('')
  @ApiOperation({ summary: 'Get a list of all advantages. Role: Admin' })
  @ApiOkResponse({ type: [Advantage] })
  async getAll(): Promise<IAdvantage[]> {
    return this.advantagesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Get('me')
  @ApiOperation({
    summary: 'Get a list of all advantages of authenticated user',
  })
  @ApiOkResponse({ type: [Advantage] })
  async getAllOfMe(@AuthUser() user: IJwtInfo): Promise<IAdvantage[]> {
    return this.advantagesService.findAllOfUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a advantage by id. Role: Admin' })
  @ApiOkResponse({ type: Advantage })
  get(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: IJwtInfo
  ): Promise<IAdvantage> {
    return this.advantagesService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Post('')
  @ApiOperation({
    summary:
      'Create a new advantage entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: Advantage })
  create(
    @Body() createAdvantageRequest: CreateAdvantageRequest,
    @AuthUser() user: IJwtInfo
  ): Promise<IAdvantage> {
    return this.advantagesService.create(createAdvantageRequest, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific advantage. Role: Admin',
  })
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: IJwtInfo
  ): Promise<void> {
    return this.advantagesService.perish(id, user);
  }
}
