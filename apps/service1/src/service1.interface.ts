import { Observable } from 'rxjs';
import { ById } from './interfaces/by-id.interface';
import { Hello } from './interfaces/hello.interface';

export interface Service1 {
  findOne(data: ById): Observable<Hello>;
  callOther(data: ById): Observable<Hello>;
}
