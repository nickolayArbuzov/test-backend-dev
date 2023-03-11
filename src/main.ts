import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser = require('cookie-parser');
import { createWriteStream } from 'fs';
import { get } from 'http';

const PORT = process.env.PORT || 5000;
const serverUrl = `http://localhost:${PORT}`

async function bootstrap() {
  
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
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);

  if (process.env.NODE_ENV === 'development') {

    // write swagger ui files
    get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
        response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
        response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
    });

    get(`${serverUrl}/swagger/swagger-ui-standalone-preset.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-standalone-preset.js'));
    });

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
    });
  }
}
bootstrap();
