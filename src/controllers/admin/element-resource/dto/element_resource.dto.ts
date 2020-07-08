import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsOptional } from "class-validator"
import { Transform } from "class-transformer"

export class ElementResourceDto {

  @ApiPropertyOptional({ required: true, description: '元素名称'})
  name: string

  @ApiPropertyOptional({ required: true, description: '头像'})
  code: string


  type: number

  iconUrl: string

  pathUrl: string

  sort: number

  description: string

  @ApiPropertyOptional({ 
    required: false,
    description: '状态',
    enum: [0, 1], // 枚举
    default: 1
  })
  @IsEnum({ 禁用: 0, 启用: 1 }, { message: '必须是0或者1' })
  @Transform(value => parseInt(value, 10))
  @IsOptional() // 可选的
  status: number
}