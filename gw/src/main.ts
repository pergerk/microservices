import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import register from '@react-ssr/nestjs-express/register';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await register(app);
  await app.listen(3000);
}
bootstrap();
