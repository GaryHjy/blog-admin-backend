import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/user_role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly UserRoleRepository: Repository<UserRole>,
  ) {}

  async findUserRoleByIds(userId): Promise<UserRole[]> {
    return await this.UserRoleRepository.find({
      where: {
        userId,
      },
    });
  }
}
