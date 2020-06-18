import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { UserRep } from './dto/user.rep.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

import { CurrentUser } from 'src/decorators/current.user';
import { UserService } from 'src/service/admin/user/user.service';
import { UserRoleService } from 'src/service/admin/user-role/user-role.service';
import { RoleService } from 'src/service/admin/role/role.service';

@Controller('user')
@ApiTags('用户模块')
@ApiBearerAuth()
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
    private readonly roleService: RoleService
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
    const { roleIds } = createUserDto;
    const user = await this.userService.create(createUserDto);
    const successIds = await this.userRoleService.create(user.id, roleIds);
    const userRoles = await this.roleService.findRoleByIds(successIds);
    return {
      ...user,
      userRoles
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户信息', description: '根据id更新用户信息'})
  @ApiOkResponse({ type: UserRep })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserRep> {
    const { roleIds, ...params } =  updateUserDto;
    return await this.userService.updateById(id, params)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户信息', description: '根据id获取用户信息' })
  @ApiOkResponse({ type: UserRep })
  async detail(@Param('id') id: number): Promise<UserRep> {
    const user = await this.userService.findById(id);
    const roleIds = await this.userRoleService.findUserRoleById(id);
    const ids = roleIds.map(item => item.roleId)
    const userRoles = await this.roleService.findRoleByIds(ids);
    return {
      ...user,
      userRoles
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户信息', description: '根据用户id删除用户信息'})
  @HttpCode(HttpStatus.OK)
  async remove(@CurrentUser('id') currentId: number, @Param('id') id: number): Promise<boolean> {
    return await this.userService.removeUserById(currentId, id);
  }
}
