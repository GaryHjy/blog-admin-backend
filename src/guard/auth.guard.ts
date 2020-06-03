import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/service/admin/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // 获取请求信息
    const request = context.switchToHttp().getRequest();

    // 获取token
    const { authorization } = context.switchToRpc().getData().headers
    const token = authorization && authorization.substring(7) // 截取Bearer之后的token
    const whiteUrl = this.configService.get('global.whiteUrl')
    
    Logger.log(`当前的token: ${token}`, 'AuthGuard');

    // 绕过白名单
    if(whiteUrl.find(url => request.url.indexOf(url) >= 0)) {
      return true
    }

    // 判断authorization是否携带token
    if(token) {
      const user = await this.authService.verifyToken(token) // 校验token是否有效
      // 解析token将用户信息存储在请求头中
      request.user = user
      return true
    } else {
      throw new HttpException('没有授权不能访问,请先登录', HttpStatus.UNAUTHORIZED);
    }
  }
}