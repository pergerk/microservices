import { Controller, Get, Inject, Param, UseFilters } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Service1 } from 'apps/service1/src/service1.interface';
import { Hello } from 'apps/service2/src/interfaces/hello.interface';
import { Service2 } from 'apps/service2/src/service2.interface';
import { catchError, Observable, of } from 'rxjs';
import { AppExceptionFilter } from './app.filter';

@UseFilters(new AppExceptionFilter())
@Controller()
export class AppController {
  private service1: Service1;
  private service2: Service2;

  constructor(
    @Inject('SERVICE1') private readonly client1: ClientGrpc,
    @Inject('SERVICE2') private readonly client2: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service1 = this.client1.getService<Service1>('Service1');
    this.service2 = this.client2.getService<Service2>('Service2');
  }
  @Get('service1/to-service2')
  callOther(): Observable<Hello> {
    return this.service1.callOther({ id: 1 });
  }

  @Get('service1')
  getById(): Observable<Hello> {
    return this.service1.findOne({ id: 1 });
  }

  @Get('service2')
  getById2(): Observable<Hello> {
    return this.service2.findOne({ id: 1 });
  }
}
