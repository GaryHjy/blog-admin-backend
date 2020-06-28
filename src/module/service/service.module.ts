import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "src/entities/user.entity";
import { UserRole } from "src/entities/user_role.entity";
import { Role } from 'src/entities/role.entity';
import { ElementResource } from "src/entities/element_resource.entity";

import { UserService } from "src/service/admin/user/user.service";
import { RoleService } from "src/service/admin/role/role.service";
import { UserRoleService } from "src/service/admin/user-role/user-role.service";
import { ElementResourceService } from "src/service/admin/element-resource/element-resource.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      UserRole,
      ElementResource
    ])
  ],
  providers: [
    UserService,
    RoleService,
    UserRoleService,
    ElementResourceService
  ],
  exports: [
    UserService,
    RoleService,
    UserRoleService,
    ElementResourceService
  ]
})
export class ServiceModule {}