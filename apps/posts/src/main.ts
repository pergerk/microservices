import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Service2Module } from './service2.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    Service2Module,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:6002',
        package: 'service2',
        protoPath: join(__dirname, './service2.proto'),
      },
    },
  );
  app.listen();
}
bootstrap();
