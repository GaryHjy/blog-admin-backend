import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty} from 'class-validator'


export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空'})
  @IsString({ message: '用户名必须为字符类型'})
  username: string

  @ApiProperty({ description: '密码' })
  password: string

}

export class LoginUserDto {
  @ApiProperty({ description: '用户名' })
  username: string

  @ApiProperty({ description: '密码' })
  password: string
}
