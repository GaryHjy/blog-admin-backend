import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { UserLoginRep } from 'src/user/dto/user.login.rep.dto';

@Controller('token')
@ApiTags('鉴权')
export class TokenController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Get()
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
