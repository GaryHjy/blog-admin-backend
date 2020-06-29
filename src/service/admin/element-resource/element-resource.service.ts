import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElementResource } from 'src/entities/element_resource.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ElementResourceService {
  constructor(
    @InjectRepository(ElementResource)
    private readonly ElementResourceRepository: Repository<ElementResource>
  ) {}
}
