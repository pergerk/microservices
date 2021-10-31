import { GrpcExceptionFilter } from '@lib/errors/exception.filter';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Service1Controller } from './service1.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE2',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:6002',
          package: 'service2',
          protoPath: join(__dirname, './service2.proto'),
        },
      },
    ]),
  ],
  controllers: [Service1Controller],
  providers: [],
})
export class Service1Module {}
