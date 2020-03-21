import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // 获取请求信息
    // const request = context.switchToHttp().getRequest();

    // 获取token
    const { authorization } = context.switchToRpc().getData().headers
    const token = authorization && authorization.substring(7) // 截取Bearer之后的token
    
    if(token) {
      try {
        await this.authService.verifyToken(token) // 校验token是否有效
        return true
      } catch (e) {
        throw new HttpException('token已过期，请重新登录', HttpStatus.UNAUTHORIZED); // 捕获过期异常
      }
    }
     else {
      throw new HttpException('没有授权不能访问,请先登录', HttpStatus.UNAUTHORIZED);
    }
  }
}