import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleRepDto } from './dto/role.rep.dto';
import { CreateRoleDto } from './dto/create.role.dto';
import { UpdateRoleDto } from './dto/update.role.dto';

@Controller('role')
@ApiTags('角色模块')
@ApiBearerAuth()
export class RoleController {

  constructor(
    private readonly roleService: RoleService
  ) {}

  @Get()
  @ApiOperation({ summary: '获取角色列表', description: '获取角色列表'})
  findAll() {
    return this.roleService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '创建角色', description: '创建角色'})
  @ApiOkResponse({type: RoleRepDto})
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleRepDto> {
    return await this.roleService.create(createRoleDto);
  }

  @Get(':id')
  @ApiOperation({summary: '获取角色信息', description: '通过id获取角色信息'})
  @ApiOkResponse({type: RoleRepDto })
  async detail(@Param('id') id:number): Promise<RoleRepDto> {
    return await this.roleService.findById(id);
  }

  @Put(':id')
  @ApiOperation({summary: '更新角色', description: '更新角色信息'})
  @ApiOkResponse({type: RoleRepDto})
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleRepDto> {
    return await this.roleService.updateById(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({summary: '删除角色', description: '根据角色id删除角色信息'})
  async remove(@Param('id') id: number): Promise<boolean> {
    return await this.roleService.removeRoleById(id);
  }
}
