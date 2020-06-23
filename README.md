# blog-admin-backend

博客管理员后端接口

### 说明

- 利用nestjs脚手架初始化 [参考](https://docs.nestjs.cn/6/firststeps?id=%e5%bb%ba%e7%ab%8b)

- 利用@nestjs/config管理配置文件 [参考](https://docs.nestjs.com/techniques/configuration)

```
src/config/database.config.ts
src/config/global.config.ts
```

- 利用@nestjs/swagger swagger-ui-express生成接口文档 [参考](https://docs.nestjs.cn/6/recipes?id=openapi-swagger)
```
src/main.ts
```
- 全局处理统一请求成功、失败返回格式处理 
```
src/filters/http-exception.filter.ts
src/interceptors/transform/transform.interceptor.ts
```

- 全局使用jwt统一处理授权问题

```
src/auth
src/guard/auth.guard.ts
```

### 启动
- 添加.env文件
```
// 数据库配置
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=test

// 端口号
PORT=8888

// api前缀
PREFIX=api/v1

// jwt加盐
SECRET=abc

// token有效期
EXPIRES_IN=1800s
```
- 运行代码
```
yarn start:dev
// or
npm run start:dev启动
```
- swagger-doc接口文档
```
http://localhost:8888/api-doc
```