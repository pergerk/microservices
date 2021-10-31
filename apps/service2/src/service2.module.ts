import { Module } from '@nestjs/common';
import { Service2Controller } from './service2.controller';

@Module({
  imports: [],
  controllers: [Service2Controller],
  providers: [],
})
export class Service2Module {}
