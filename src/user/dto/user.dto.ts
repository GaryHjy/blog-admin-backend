import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsOptional, IsEmail, IsMobilePhone} from 'class-validator'
import { Transform } from "class-transformer"


export class UserDto {

  @ApiProperty({
    required: false,
    description: '用户角色',
    enum: ['root', 'admin', 'guest'], // 枚举
    default: 'guest'
  })
  @IsEnum({ root: 'root', admin: 'admin', guest: 'guest'})
  role?: any

  @ApiPropertyOptional({ required: false, description: '昵称' })
  nickName?: string

  @ApiPropertyOptional({ required: false, description: '头像' })
  avatar?: string

  @ApiPropertyOptional({ required: false, description: '邮箱' })
  // eslint-disable-next-line @typescript-eslint/camelcase
  @IsEmail({ allow_display_name: true }, { message: '邮箱格式错误' })
  @IsOptional()
  readonly email?: string;

  @ApiPropertyOptional({ required: false, description: '手机号码' })
  @IsMobilePhone('zh-CN', { message: '手机号码格式错误' })
  @IsOptional()
  readonly mobile?: string;

  @ApiProperty({ 
    required: false,
    description: '状态',
    enum: [0, 1], // 枚举
    default: 1
  })
  @IsEnum({ 禁用: 0, 启用: 1 }, { message: '必须是0或者1' })
  @Transform(value => parseInt(value, 10))
  @IsOptional() // 可选的
  status?: number

}
