import {
  CreateCombatTechniqueRequest,
  ICombatTechnique,
  IJwtInfo,
  Role,
} from '@igikanam/interfaces';
import { CombatTechnique } from '@igikanam/models';
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
import { CombatTechniquesService } from './combat-techniques.service';

@ApiBearerAuth()
@ApiTags('Combat Techniques')
@Controller('combat-techniques')
export class CombatTechniquesController {
  constructor(
    private readonly combatTechniquesService: CombatTechniquesService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('')
  @ApiOperation({ summary: 'Get a list of all combatTechniques. Role: Admin' })
  @ApiOkResponse({ type: [CombatTechnique] })
  async getAll(): Promise<ICombatTechnique[]> {
    return this.combatTechniquesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Get('me')
  @ApiOperation({
    summary: 'Get a list of all combatTechniques of authenticated user',
  })
  @ApiOkResponse({ type: [CombatTechnique] })
  async getAllOfMe(@AuthUser() user: IJwtInfo): Promise<ICombatTechnique[]> {
    return this.combatTechniquesService.findAllOfUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a combatTechnique by id. Role: Admin' })
  @ApiOkResponse({ type: CombatTechnique })
  get(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: IJwtInfo
  ): Promise<ICombatTechnique> {
    return this.combatTechniquesService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Post('')
  @ApiOperation({
    summary:
      'Create a new combatTechnique entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: CombatTechnique })
  create(
    @Body() createCombatTechniqueRequest: CreateCombatTechniqueRequest,
    @AuthUser() user: IJwtInfo
  ): Promise<ICombatTechnique> {
    return this.combatTechniquesService.create(
      createCombatTechniqueRequest,
      user
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.user, Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific combatTechnique. Role: Admin',
  })
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthUser() user: IJwtInfo
  ): Promise<void> {
    return this.combatTechniquesService.perish(id, user);
  }
}
