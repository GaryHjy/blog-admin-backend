import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { UserLoginDto } from '../user/dto/user.login.dto';
import { UserRep } from '../user/dto/user.rep.dto';
import { UserService } from '../user/user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('login')
@ApiTags('用户登录')
export class LoginController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @ApiOperation({ summary: '用户登录', description: '根据用户名密码登录'})
  @ApiOkResponse({ type: UserRep})
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserRep> {
    const user = await this.userService.login(userLoginDto);
    const accessToken = await this.authService.sign(user);
    
    return {
      ...user,
      ...accessToken
    }
  }
}
