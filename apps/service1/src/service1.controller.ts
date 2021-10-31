import { CustomGrpcFilter } from '@lib/errors/decorator';
import { Controller, Inject } from '@nestjs/common';
import { ClientGrpc, GrpcMethod, RpcException } from '@nestjs/microservices';
import { Service2 } from 'apps/service2/src/service2.interface';
import { Observable } from 'rxjs';
import { ById } from './interfaces/by-id.interface';
import { Hello } from './interfaces/hello.interface';

@Controller()
@CustomGrpcFilter()
export class Service1Controller {
  private readonly items: Hello[] = [
    { id: 1, name: 'Service1-1' },
    { id: 2, name: 'Service1-2' },
  ];
  private service2: Service2;

  constructor(@Inject('SERVICE2') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.service2 = this.client.getService<Service2>('Service2');
  }

  @GrpcMethod('Service1')
  findOne(data: ById): Observable<Hello> {
    console.log('callone called');
    throw new RpcException('Error in service 1');
  }

  @GrpcMethod('Service1')
  callOther(data: ById): Observable<Hello> {
    console.log('callother called');
    return this.service2.findRpc(data);
  }
}
