import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/user_role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly UserRoleRepository: Repository<UserRole>,
  ) {}

  async findUserRoleById(userId): Promise<UserRole[]> {
    return await this.UserRoleRepository.find({
      where: {
        userId,
      },
    });
  }

  /**
   * @author GaryHjy
   * @description 创建用户角色关系
   * @param {number} userId
   * @param {number[]} roleIds
   * @returns
   * @memberof UserRoleService
   */
  async create(userId: number, roleIds: number[])  {
    if(roleIds.length) {
      const { raw: { affectedRows } }= await this.UserRoleRepository.createQueryBuilder()
        .insert().values(roleIds.map(roleId => {
          return {
            userId,
            roleId
          }
        })).execute();
      if(affectedRows === roleIds.length) {
        return roleIds;
      } else {
        throw new HttpException(
          {
            message: '关联角色失败',
            code: 400
          },
          HttpStatus.OK,
        )
      }
    } else {
      return []
    }
  }
}
