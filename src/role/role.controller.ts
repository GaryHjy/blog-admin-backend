import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('role')
@ApiTags('角色模块')
@ApiBearerAuth()
export class RoleController {

  @Get()
  findAll() {
    return []
  }

  @Post()
  create() {
    return 'ok'
  }

  @Put()
  update() {
    return 'ok'
  }

  @Delete()
  remove() {
    return 'ok'
  }
}
