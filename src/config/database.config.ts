import { registerAs } from '@nestjs/config';

// 数据库配置
export default registerAs('database', () => ({
  type: process.env.DB_TYPE, // 数据库类型
  host: process.env.DB_HOST, // 数据库host
  port: Number(process.env.DB_PORT), // 数据库端口
  username: process.env.DB_USERNAME, // 用户名
  password: process.env.DB_PASSWORD, // 密码
  database: process.env.DB_DATABASE, // 数据库
  synchronize: true, // 每次应用启动后自动对数据库的视图Schema进行自动Migration
}))