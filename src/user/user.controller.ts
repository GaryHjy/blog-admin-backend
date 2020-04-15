import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRep } from './dto/user.rep.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
@ApiTags('用户')
@ApiBearerAuth()
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  @ApiOperation({ summary: '获取用户列表', description: '获取用户列表'})
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '创建用户', description: '创建用户'})
  @ApiOkResponse({ type: UserRep })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserRep> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户信息', description: '根据id更新用户信息'})
  @ApiOkResponse({ type: UserRep })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserRep> {
    return await this.userService.updateById(id, updateUserDto)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户信息', description: '根据id获取用户信息' })
  async detail(@Param('id') id: number): Promise<UserRep> {
    return await this.userService.findById(id)
  }
}
