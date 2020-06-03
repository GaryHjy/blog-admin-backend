import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserService } from "src/service/admin/user/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ])
  ],
  providers: [
    UserService
  ],
  exports: [
    UserService
  ]
})
export class ServiceModule {}