
import { UserRep } from './user.rep.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginRep extends UserRep {

  @ApiProperty({ description: '用户token'})
  accessToken?: string;
}