/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from '@igikanam/interfaces';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  async login(@Request() req, @Body() LoginRequest: LoginRequest) {
    // uses the passport library logic to obtain the user
    return this.authService.login(req.user);
  }

  // The role query variable could be path of the DTO but this way I get to showcase the custom enum validation pipe :)
  @Post('signup')
  @ApiOperation({
    summary: `Create a user.`,
  })
  @ApiOkResponse({ type: LoginResponse })
  async signup(@Body() signupRequestDto: SignupRequest) {
    return this.authService.signup(signupRequestDto);
  }
}
