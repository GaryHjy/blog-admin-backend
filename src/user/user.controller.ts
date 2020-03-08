import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

class LoginUserDto {
  @ApiProperty({ description: '用户名'})
  username: string

  @ApiProperty({ description: '密码' })
  password: string
}

@Controller('user')
@ApiTags('用户')
export class UserController {
  @Get()
  @ApiOperation({ summary: '用户列表'})
  findAll() {
    return [
      {
        id: 1,
        name: '小明'
      },
      {
        id: 2,
        name: '小红'
      }
    ]
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  //  @Query() query, @Param() params
  login(@Body() body: LoginUserDto) {
    console.log(body)
    return {
      code: 200,
      msg: 'success',
      data: {
        id: "1",
        ...body
      }
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '用户信息' })
  detail(@Param('id') id:string ) {
    return {
      code: 200,
      msg: 'success',
      data: {
        id,
        username: 'admin',
        token: "xxxxxxx"
      }
    }
  }
}
