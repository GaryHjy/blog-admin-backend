import { ApiProperty } from "@nestjs/swagger";

export class UserRep {

  @ApiProperty({ description: '用户id'})
  id: number

  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '用户状态' })
  status: number

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @ApiProperty({ description: '用户权限' })
  role: string;

}
