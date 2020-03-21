import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from './pipe/validation.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置swagger
  const options = new DocumentBuilder()
    .setTitle('博客后台接口文档')
    .setDescription('博客后台接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  // 全局注册错误的过滤器(错误异常)
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器(成功返回格式)
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局校验管道(字段校验)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
