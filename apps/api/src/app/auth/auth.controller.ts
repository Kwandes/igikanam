/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from '@igikanam/interfaces';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: `Log in with as an existing user`,
  })
  @ApiOkResponse({ type: LoginResponse })
  @HttpCode(200)
  async login(@Request() req, @Body() LoginRequest: LoginRequest) {
    // uses the passport library logic to obtain the user
    return this.authService.login(req.user);
  }

  // The role query variable could be path of the DTO but this way I get to showcase the custom enum validation pipe :)
  @Post('signup')
  @ApiOperation({
    summary: `Register a new user`,
  })
  @ApiOkResponse({ type: LoginResponse })
  async signup(@Body() signupRequestDto: SignupRequest) {
    return this.authService.signup(signupRequestDto);
  }
}
