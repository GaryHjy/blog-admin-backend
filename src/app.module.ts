import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import globalConfig from './config/global.config';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './controllers/admin/admin.module';
import { AuthModule } from './module/auth/auth.module';

// 实体类路径
const entitiesPath = path.resolve(__dirname + '/*/**/*.entity{.ts,.js}');

@Module({
  imports: [
    // 配置加载配置文件
    ConfigModule.forRoot({
      load: [databaseConfig, globalConfig], // 引入配置文件
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 要import, 不然会报错
      // 接收到configService
      useFactory: async (config: ConfigService) => ({
        type: config.get('database.type'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: [entitiesPath],
        synchronize: config.get('database.synchronize'),
      }),
      inject: [ConfigService], // 注入
    }),
    AuthModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
