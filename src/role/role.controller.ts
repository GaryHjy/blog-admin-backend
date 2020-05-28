import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('role')
@ApiTags('角色模块')
@ApiBearerAuth()
export class RoleController {

  @Get()
  @ApiOperation({ summary: '获取角色列表', description: '获取角色列表'})
  findAll() {
    return []
  }

  @Post()
  @ApiOperation({ summary: '创建角色', description: '创建角色'})
  create() {
    return 'ok'
  }

  @Put()
  @ApiOperation({summary: '更新角色', description: '更新角色信息'})
  update() {
    return 'ok'
  }

  @Delete()
  @ApiOperation({summary: '删除角色', description: '根据角色id删除角色信息'})
  remove() {
    return 'ok'
  }
}
