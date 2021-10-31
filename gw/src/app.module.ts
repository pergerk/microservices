import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { grpcService1Options, grpcService2Options } from './grpc.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE1',
        ...grpcService1Options,
      },
      {
        name: 'SERVICE2',
        ...grpcService2Options,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
