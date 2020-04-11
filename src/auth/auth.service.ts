import { Injectable } from '@nestjs/common';
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
    const user = await this.userService.findOne({username})
    if (user && checkPwd(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
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
    return this.jwtService.verify(token)
  }
}
