import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginUserDto, CreateUserDto } from './dto/user.dto';

@Controller('user')
@ApiTags('用户')
@ApiBearerAuth()
export class UserController {

  constructor( private readonly userService: UserService ) {}

  @Get()
  @ApiOperation({ summary: '用户列表', description: '获取用户列表'})
  findAll() {
    return this.userService.findAll()
  }

  @Post()
  @ApiOperation({ summary: '用户创建'})
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.findOne({
      where: {
        username: body.username
      }
    })
    if (user) {
      throw new HttpException(
        {
          message: '用户名已存在',
          code: 400
        },
        HttpStatus.OK,
      )
    }
    return await this.userService.create(body)
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  login(@Body() body: LoginUserDto) {
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
    return this.userService.findOne({id})
  }
}
