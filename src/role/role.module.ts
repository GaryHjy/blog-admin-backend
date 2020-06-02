import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserRoleService } from 'src/user-role/user-role.service';
import { UserRole } from 'src/entities/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRole])],
  exports: [RoleService, UserRoleService],
  controllers: [RoleController],
  providers: [RoleService, UserRoleService],
})
export class RoleModule {}
