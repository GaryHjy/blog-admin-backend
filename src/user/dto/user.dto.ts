import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional} from 'class-validator'
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
