import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Role } from 'src/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from 'src/controllers/admin/role/dto/create.role.dto';
import { UpdateRoleDto } from 'src/controllers/admin/role/dto/update.role.dto';
import { RoleRepDto } from 'src/controllers/admin/role/dto/role.rep.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly RoleRepository: Repository<Role>
  ) {}

  findAll(): Promise<Role[]> {
    return this.RoleRepository.find();
  }

  async findRoleByIds(ids: number[]): Promise<Role[]> {
    return await this.RoleRepository.findByIds(ids);
  } 


  /**
   * @author GaryHjy
   * @description 创建角色
   * @param {CreateRoleDto} CreateRoleDto
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

  /**
   * @author GaryHjy
   * @description 根据id查询角色信息
   * @param {number} id
   * @returns {Promise<Role>}
   * @memberof RoleService
   */
  async findById(id: number):Promise<Role> {
    const role = await this.RoleRepository.findOne({id});
    if(role) {
      return role;
    } else {
      throw new HttpException(
        {
          message: '角色不存在',
          code: 400
        },
        HttpStatus.OK,
      );
    }
  }

  /**
   * @author GaryHjy
   * @description 根据id更新角色信息
   * @param {number} id
   * @param {UpdateRoleDto} updateRoleDto
   * @returns {Promise<RoleRepDto>}
   * @memberof RoleService
   */
  async updateById(id: number, updateRoleDto:UpdateRoleDto): Promise<RoleRepDto> {
    const role = await this.RoleRepository.findOne({ id });
    const { roleName: newRoleName, roleCode: newRoleCode } = updateRoleDto;
    const { roleName: oldRoleName, roleCode: oldRoleCode } = role;
    // 判断新旧角色名是否不一样
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

    // 判断新旧code是否不一样
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

    // 更新
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

  /**
   * @author GaryHjy
   * @description 根据id删除角色
   * @param {number} id
   * @returns {Promise<boolean>}
   * @memberof RoleService
   */
  async removeRoleById(id:number): Promise<boolean> {
    await this.findById(id);
    const { raw: { changedRows }} = await this.RoleRepository.delete({id});
    return !changedRows;
  }

}
