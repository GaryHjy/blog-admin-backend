import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { UserLoginRep } from './user/dto/user.login.rep.dto';

@Controller()
@ApiTags('全局')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {  }

  @Get('token')
  @ApiOperation({ summary: '根据token获取用户信息', description: '根据token获取用户信息' })
  @ApiOkResponse({ type: UserLoginRep })
  async getUserByToken(@Query('token') token: string): Promise<UserLoginRep> {
    const { id } = await this.authService.verifyToken(token);
    const user = await this.userService.findById(id);
    return {
      ...user,
      accessToken: token
    }
  }
}
