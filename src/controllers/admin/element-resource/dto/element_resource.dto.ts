import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsOptional } from "class-validator"
import { Transform } from "class-transformer"

export class ElementResourceDto {

  @ApiPropertyOptional({ required: true, description: '元素名称'})
  name: string

  @ApiPropertyOptional({ required: true, description: '头像'})
  code: string

  @ApiPropertyOptional({ required: true, description: '元素类型'})
  type: number

  @ApiPropertyOptional({ required: false, description: '元素图标'})
  iconUrl: string

  @ApiPropertyOptional({ required: false, description: '路径url'})
  pathUrl: string

  @ApiPropertyOptional({ required: false, description: '排序'})
  sort: number

  @ApiPropertyOptional({ required: false, description: '描述'})
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