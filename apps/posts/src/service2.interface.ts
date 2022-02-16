import { Observable } from 'rxjs';
import { ById } from './interfaces/by-id.interface';
import { Hello } from './interfaces/hello.interface';

export interface Service2 {
  findOne(data: ById): Observable<Hello>;
  findRpc(data: ById): Observable<Hello>;
}
