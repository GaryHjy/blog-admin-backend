import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserService } from "src/service/admin/user/user.service";
import { UserRole } from "src/entities/user_role.entity";
import { UserRoleService } from "src/service/admin/user-role/user-role.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRole
    ])
  ],
  providers: [
    UserService,
    UserRoleService
  ],
  exports: [
    UserService,
    UserRoleService
  ]
})
export class ServiceModule {}