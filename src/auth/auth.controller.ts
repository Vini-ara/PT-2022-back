import {
  Body,
  Req,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { AuthRequest } from './interface/authRequest.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('google')
  @HttpCode(HttpStatus.OK)
  async googleAuth(@Req() req: Request, @Body('token') googleToken: string) {
    const { id, name, is_admin } = await this.authService.validateGoogleUser(
      googleToken,
    );

    const { accessToken, expiresIn } =
      await this.authService.generateJwtAccesToken(id, name, is_admin);

    const refreshToken = await this.authService.generateJwtRefreshToken(
      id,
      name,
      is_admin,
    );

    const user = await this.userService.updateRefreshToken(
      id,
      refreshToken.token,
    );

    req.res.setHeader('Set-cookie', refreshToken.cookie);

    return { accessToken, expiresIn, user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: AuthRequest) {
    await this.userService.removeRefreshToken(request.user.id);

    request.res.setHeader(
      'Set-cookie',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    );

    return { message: 'Logged out' };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() request: AuthRequest) {
    const { user } = request;

    const { accessToken, expiresIn } =
      await this.authService.generateJwtAccesToken(
        user.id,
        user.name,
        user.is_admin,
      );

    const refreshToken = await this.authService.generateJwtRefreshToken(
      user.id,
      user.name,
      user.is_admin,
    );

    await this.userService.updateRefreshToken(user.id, refreshToken.token);

    request.res.setHeader('Set-cookie', refreshToken.cookie);

    return { accessToken, expiresIn };
  }
}
