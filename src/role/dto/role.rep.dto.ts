
import { RoleDto } from './role.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RoleRepDto extends RoleDto {

  @ApiProperty({ description: '角色id' })
  id: number

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}