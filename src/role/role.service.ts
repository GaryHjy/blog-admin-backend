import { Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly RoleRepository: Repository<RoleEntity>
  ) {}

  findAll(): Promise<RoleEntity[]> {
    return this.RoleRepository.find();
  }
}
