import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'
import { checkPwd } from 'src/utils/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username)
    if (user && checkPwd(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async sign(user: any) {
    const {username, password, id } = user;
    return {
      accessToken: this.jwtService.sign({
        id,
        username,
        password,
      })
    }
  }

  // 校验token是否有效
  async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token)
    } catch (e) {
      throw new HttpException('token已过期，请重新登录', HttpStatus.UNAUTHORIZED); // 捕获过期异常
    }
  }
}
