import { GrpcExceptionFilter } from '@lib/errors/exception.filter';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Service1Module } from './service1.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    Service1Module,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:6001',
        package: 'service1',
        protoPath: join(__dirname, './service1.proto'),
      },
    },
  );
  app.listen();
}
bootstrap();
