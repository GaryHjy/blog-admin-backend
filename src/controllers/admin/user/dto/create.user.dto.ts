import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from 'class-validator'
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  @ApiProperty({ description: '用户名' })
  @IsString({ message: '用户名必须为字符类型' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @ApiProperty({ description: '密码' })
  @IsString({ message: '密码必须为字符类型' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}