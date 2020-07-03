import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ElementResourceService } from 'src/service/admin/element-resource/element-resource.service';

@Controller('element/resource')
@ApiTags('元素模块')
@ApiBearerAuth()
export class ElementResourceController {
  constructor(
    private readonly elementResourceService: ElementResourceService
  ) {}

  @Get()
  @ApiOperation({ summary: '获取元素列表', description: '获取元素列表'})
  findAll() {
    return this.elementResourceService.findAll();
  }

  @Post()
  create() {
    
  }
}
