import { ApiProperty } from "@nestjs/swagger";

export class UserRep {

  @ApiProperty({ description: '用户id'})
  id: number

  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '手机号' })
  mobile: string;

  @ApiProperty({ 
    description: '用户状态',
    enum: [0, 1]
  })
  status: number

  @ApiProperty({description: '角色'})
  userRoles?: object[]

  @ApiProperty({ description: '创建时间' })
  createdTime: Date;

  @ApiProperty({ description: '更新时间' })
  updatedTime: Date;

}
