import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: {
    origin: ['http://localhost:3000'],
    credentials: true
  }})
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Swagger-doc for test-task')
    .setDescription('The test-task API description')
    .setVersion('1.0')
    .addTag('test-task')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
