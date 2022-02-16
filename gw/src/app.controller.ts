import { Controller, Get, UseFilters } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AppExceptionFilter } from './app.filter';

@UseFilters(new AppExceptionFilter())
@Controller()
export class AppController {

  constructor(
  ) {}

  onModuleInit() {
  }
  @Get('service1/to-service2')
  callOther(): Observable<string> {
    return of('Hello world')
  }
}
