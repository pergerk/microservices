import { RpcException } from '@nestjs/microservices';

export interface IExceptionArgument {
  code: number;
  stack?: string[];
  errors?: unknown[];
  [key: string]: unknown;
}

export class BaseException extends RpcException {
  private code: number | undefined = 2;
  constructor(arg: IExceptionArgument | string) {
    super(arg);
    if (typeof arg === 'string') {
      this.code = 10;
    } else if (arg.code) {
      const { code, ...details } = arg;
      this.code = code;
      this.message = JSON.stringify({
        ...details,
        stack: [new Error().stack, ...(details.stack ? details.stack : [])],
      });
    }
  }
}
