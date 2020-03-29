import { registerAs } from '@nestjs/config';

// 全局配置
export default registerAs('global', () => {
  const PREFIX = process.env.PREFIX || '/';
  return {
    secret: process.env.SECRET, // jwt加盐
    expiresIn: process.env.EXPIRES_IN, // jwt有效期
    whiteUrl: [`${PREFIX}/auth/login`, `${PREFIX}/user`], // 白名单api
  }
})