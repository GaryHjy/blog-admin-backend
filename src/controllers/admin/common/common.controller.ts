import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from 'src/service/admin/user/user.service';
import { UserLoginRep } from 'src/controllers/admin/user/dto/user.login.rep.dto';
import { UserLoginDto } from 'src/controllers/admin/user/dto/user.login.dto';
import { AuthService } from 'src/service/admin/auth/auth.service';

@Controller()
@ApiTags('全局')
export class CommonController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  /**
   * @description 根据token获取用户信息
   * @author GaryHjy
   * @param {string} token 用户token
   * @returns {Promise<UserLoginRep>} 返回UserLoginRep Dto
   * @memberof CommonController
   */
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

  /**
   * @description 用户登录
   * @author GaryHjy
   * @param {UserLoginDto} userLoginDto body参数
   * @returns {Promise<UserLoginRep>} 返回UserLoginRep Dto
   * @memberof CommonController
   */
  @Post('login')
  @ApiOperation({ summary: '用户登录', description: '根据用户名密码登录' })
  @ApiOkResponse({ type: UserLoginRep })
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserLoginRep> {
    const user = await this.userService.login(userLoginDto);
    const { accessToken } = await this.authService.sign(user);

    return {
      ...user,
      accessToken
    }
  }
}
