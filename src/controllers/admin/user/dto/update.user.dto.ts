import { UserDto } from './user.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends UserDto {

  @ApiPropertyOptional({ required: false, description: '用户名' })
  @IsOptional()
  readonly username?: string;
}