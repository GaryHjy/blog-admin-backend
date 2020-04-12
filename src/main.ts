import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from './pipe/validation.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';

const PORT = process.env.PORT || 3000;
const PREFIX = process.env.PREFIX || '/'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置请求prefix
  app.setGlobalPrefix(PREFIX);
  
  // 配置swagger
  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('接口文档')
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'Authorization' })
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
  await app.listen(PORT);
}
bootstrap();
