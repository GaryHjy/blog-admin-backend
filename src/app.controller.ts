import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';

class UserDto {
  @ApiProperty({ description: '用户名' })
  username: string

  @ApiProperty({ description: '密码' })
  password: string
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService  
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req, @Body() body: UserDto) {
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
