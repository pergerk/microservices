import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { details, code, ...data } = exception as {
      details: string;
      code: number;
    };
    let message: string;
    console.log('----> ', exception);
    if (details) {
      message = details;
    } else {
      message = 'Internal server error';
    }
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
      path: request.url,
      // exception,
    });
  }
}
