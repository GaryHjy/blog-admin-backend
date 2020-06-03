import { Module } from "@nestjs/common";
import { UserController } from "./user/user.controller";
import { RoleController } from "./role/role.controller";
import { ServiceModule } from "src/module/service/service.module";

@Module({
  imports: [
    ServiceModule
  ],
  providers: [
    
  ],
  controllers: [
    UserController,
    RoleController
  ]
})
export class AdminModule {}
