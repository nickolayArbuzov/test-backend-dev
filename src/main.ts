import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: {
    origin: ['http://localhost:3000'],
    credentials: true
  }})
  app.use(cookieParser());
  await app.listen(PORT);
}
bootstrap();
