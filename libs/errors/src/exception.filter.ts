import {
  ArgumentsHost,
  CallHandler,
  Catch,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  BaseRpcExceptionFilter,
  Ctx,
  RpcException,
} from '@nestjs/microservices';
import { Metadata } from 'grpc';
import { Observable, throwError } from 'rxjs';
import { BaseException } from './errors/base.exception';

@Catch()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(
    exception: RpcException | { code: number; details: string },
    host: ArgumentsHost,
  ): Observable<RpcException> {
    const rpc = host.switchToRpc();
    const ctx = rpc.getContext<Metadata>();
    console.log('host.getType()', host.getType());
    console.log(ctx.get('class'));
    console.log(ctx.get('handler'));
    console.log(ctx.get('handler1'));

    if (exception instanceof RpcException) {
      console.log('filtered instance rpc', exception.message);
      return throwError(() => exception);
    } else if (exception instanceof Error) {
      const { code, details } = exception;
      try {
        const json = JSON.parse(details);
        return throwError(() => new BaseException({ ...json, code }));
      } catch (e) {
        return throwError(() => new RpcException(exception.message));
      }
    } else if (exception?.details) {
      return throwError(() => new RpcException(exception.details));
    }
    //TODO: maybe need to handle other type of exceptions?
    return throwError(() => exception);
  }
}

@Injectable()
export class MetadataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpc = context.switchToRpc();
    const ctx = rpc.getContext<Metadata>();
    ctx.add('Handler', context.getHandler().name);
    ctx.add('Class', context.getClass().name);
    return next.handle();
  }
}
