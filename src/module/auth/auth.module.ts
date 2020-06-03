import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceModule } from 'src/module/service/service.module';

import { AuthService } from 'src/service/admin/auth/auth.service';


@Module({
  imports: [
    ServiceModule,
    PassportModule,
    // 注册jwt模块
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService): Promise<object> => ({
        secret: config.get('global.secret'), // token加盐
        signOptions: {
          expiresIn: config.get('global.expiresIn') // token有效期
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
  exports: [AuthService]
})
export class AuthModule {}
