import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [TokenController]
})
export class TokenModule {
}
