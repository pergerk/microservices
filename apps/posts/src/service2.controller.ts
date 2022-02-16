import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ById } from './interfaces/by-id.interface';
import { Hello } from './interfaces/hello.interface';
import { CustomGrpcFilter } from '@lib/errors/decorator';

@CustomGrpcFilter()
@Controller()
export class Service2Controller {
  private readonly items: Hello[] = [
    { id: 1, name: 'Service2-1' },
    { id: 2, name: 'Service2-2' },
  ];

  @GrpcMethod('Service2')
  findOne(data: ById): Observable<Hello> {
    throw new RpcException('Error internal exception in service2 ' + data);
  }
  @GrpcMethod('Service2')
  findRpc(data: ById): Observable<Hello> {
    throw new RpcException('Error internal exception in service2 ' + data);
  }
}
