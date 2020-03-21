import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginUserDto, CreateUserDto } from './dto/user.dto';

@Controller('user')
@ApiTags('用户')
export class UserController {

  constructor( private readonly userService: UserService ) {}

  @Get()
  @ApiOperation({ summary: '用户列表'})
  findAll() {
    return this.userService.findAll()
    // return [
    //   {
    //     id: 1,
    //     name: '小明'
    //   },
    //   {
    //     id: 2,
    //     name: '小红'
    //   }
    // ]
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const res = await this.userService.create(body)
    return res
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
    return this.userService.findOne({id})
  }
}
