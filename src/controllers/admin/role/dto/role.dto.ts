import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEnum, IsOptional, IsNotEmpty } from "class-validator"
import { Transform } from "class-transformer"

export class RoleDto {

  @ApiProperty({
    required: true,
    description: '角色名称'
  })
  @IsString({message: '角色名称必选为字符串'})
  @IsNotEmpty({ message: '角色名称不能为空'})
  roleName: string

  @ApiProperty({
    required: true,
    description: '角色编号'
  })
  @IsString({message: '角色编号必选为字符串'})
  @IsNotEmpty({ message: '角色编号不能为空' })
  roleCode: string

  @ApiProperty({
    required: true,
    description: '排序值'
  })
  @IsNotEmpty({ message: '排序值不能为空' })
  sort: number

  @ApiProperty({
    required: false,
    description: '描述'
  })
  @IsString({ message: '角色编号必选为字符串' })
  description?: string | null

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