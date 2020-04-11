import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRep } from './dto/user.rep.dto';

@Controller('user')
@ApiTags('用户')
@ApiBearerAuth()
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiOperation({ summary: '用户列表', description: '获取用户列表'})
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '用户创建'})
  @ApiOkResponse({ type: UserRep })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserRep> {
    return await this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiOkResponse({ type: UserRep })
  async login(@Body() loginUserDto: UserLoginDto): Promise<UserRep> {
    return await this.userService.login(loginUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '用户信息' })
  detail(@Param('id') id:string ) {
    return this.userService.findOne({id})
  }
}
