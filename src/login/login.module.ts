import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [LoginController]
})
export class LoginModule {}
