import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcService1Options: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:6001',
    package: 'service1',
    protoPath: join(__dirname, './src/service1.proto'),
  },
};

export const grpcService2Options: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:6002',
    package: 'service2',
    protoPath: join(__dirname, './src/service2.proto'),
  },
};
