import { Module } from "@nestjs/common";
import { CommonController } from "./common/common.controller";
import { UserController } from "./user/user.controller";
import { RoleController } from "./role/role.controller";
import { ServiceModule } from "src/module/service/service.module";
import { AuthModule } from 'src/module/auth/auth.module';

@Module({
  imports: [
    ServiceModule,
    AuthModule
  ],
  controllers: [
    CommonController,
    UserController,
    RoleController
  ]
})
export class AdminModule {}
