import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { RoleEntity } from 'src/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create.role.dto';
import { UpdateRoleDto } from './dto/update.role.dto';
import { RoleRepDto } from './dto/role.rep.dto';

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
  async create(createRoleDto: CreateRoleDto): Promise<RoleRepDto> {
    const { roleName, roleCode} = createRoleDto;
    const isRoleName = await this.RoleRepository.count({ roleName });
    // 判断角色明是否存在
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
    // 判断角色编号是否存在
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

  async findById(id: number):Promise<RoleEntity> {
    return await this.RoleRepository.findOne({id});
  }

  async updateById(id: number, updateRoleDto:UpdateRoleDto): Promise<RoleRepDto> {
    const role = await this.findById(id);
    const { roleName: newRoleName, roleCode: newRoleCode } = updateRoleDto;
    const { roleName: oldRoleName, roleCode: oldRoleCode } = role;
    if (newRoleName !== oldRoleName) {
      const isRoleName = await this.RoleRepository.count({ roleName: newRoleName });
      // 判断角色明是否存在
      if (isRoleName) {
        throw new HttpException(
          {
            message: '角色名已存在',
            code: 400
          },
          HttpStatus.OK
        )
      }
    }

    if (newRoleCode !== oldRoleCode) {
      const isCode = await this.RoleRepository.count({ roleCode: newRoleCode });
      // 判断角色编号是否存在
      if (isCode) {
        throw new HttpException(
          {
            message: '角色编号已存在',
            code: 400
          },
          HttpStatus.OK
        )
      }
    }

    const { raw: { changedRows } } = await this.RoleRepository.update({ id }, updateRoleDto);
    if (changedRows) {
      return await this.findById(id);
    } else {
      throw new HttpException(
        {
          message: '修改失败',
          code: 400
        },
        HttpStatus.OK,
      )
    }
    
  }

}
