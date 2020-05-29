import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { RoleEntity } from 'src/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create.role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly RoleRepository: Repository<RoleEntity>
  ) {}

  findAll(): Promise<RoleEntity[]> {
    return this.RoleRepository.find();
  }

  /**
   * @author GaryHjy
   * @description 创建角色
   * @param {CreateRoleDto} createRoleDto
   * @returns
   * @memberof RoleService
   */
  async create(createRoleDto: CreateRoleDto) {
    const { roleName, roleCode} = createRoleDto;
    const isRoleName = await this.RoleRepository.count({ roleName });
    if (isRoleName) {
      throw new HttpException(
        {
          message: '角色名已存在',
          code: 400
        },
        HttpStatus.OK
      )
    }
    const isCode = await this.RoleRepository.count({ roleCode });
    if(isCode) {
      throw new HttpException(
        {
          message: '角色编号已存在',
          code: 400
        },
        HttpStatus.OK
      )
    }
    const role = await this.RoleRepository.create(createRoleDto);
    return await this.RoleRepository.save(role);
  }

}
