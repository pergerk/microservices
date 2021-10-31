import { ArgumentsHost, Catch, ExecutionContext } from '@nestjs/common';
import {
  BaseRpcExceptionFilter,
  Ctx,
  RpcException,
} from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { BaseException } from './errors/base.exception';

@Catch()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(
    exception: RpcException | { code: number; details: string },
    host: ArgumentsHost,
  ): Observable<RpcException> {
    const rpc = host.switchToRpc();
    const ctx = rpc.getContext<ExecutionContext>();
    console.log('host.getType()', host.getType());
    console.log('ctx.getClass fn', ctx.getClass);
    console.log('ctx.getHandler fn', ctx.getHandler);
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
