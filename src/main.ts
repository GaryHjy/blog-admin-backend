import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from './pipe/validation.pipe';

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

  // 全局校验管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
