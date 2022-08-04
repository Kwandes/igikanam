import {
  CreateSpecialAbilityRequest,
  ISpecialAbility,
  Role,
} from '@igikanam/interfaces';
import { SpecialAbility, User } from '@igikanam/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
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
import { ParseObjectIdPipe } from '../shared/pipes/object-id-vaidation.pipe';
import { SpecialAbilitiesService } from './special-abilities.service';

@ApiBearerAuth()
@ApiTags('Source Tags')
@Controller('source-tags')
export class SpecialAbilitiesController {
  constructor(
    private readonly specialAbilitiesService: SpecialAbilitiesService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('')
  @ApiOperation({ summary: 'Get a list of all specialAbilities. Role: Admin' })
  @ApiOkResponse({ type: [SpecialAbility] })
  async getAll(): Promise<ISpecialAbility[]> {
    return this.specialAbilitiesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Get('me')
  @ApiOperation({
    summary: 'Get a list of all specialAbilities of authenticated user',
  })
  @ApiOkResponse({ type: [SpecialAbility] })
  async getAllOfMe(@AuthUser() user: User): Promise<ISpecialAbility[]> {
    return this.specialAbilitiesService.findAllOfUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a specialAbility by id. Role: Admin' })
  @ApiOkResponse({ type: SpecialAbility })
  get(
    @Param('id', ParseObjectIdPipe) id: string,
    @AuthUser() user: User
  ): Promise<ISpecialAbility> {
    return this.specialAbilitiesService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Post('')
  @ApiOperation({
    summary:
      'Create a new specialAbility entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: SpecialAbility })
  create(
    @Body() createSpecialAbilityRequest: CreateSpecialAbilityRequest,
    @AuthUser() user: User
  ): Promise<ISpecialAbility> {
    return this.specialAbilitiesService.create(
      createSpecialAbilityRequest,
      user
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific specialAbility. Role: Admin',
  })
  delete(
    @Param('id', ParseObjectIdPipe) id: string,
    @AuthUser() user: User
  ): Promise<void> {
    return this.specialAbilitiesService.perish(id, user);
  }
}
