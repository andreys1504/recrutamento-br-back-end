import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const response = http.getResponse();

    return next.handle().pipe(
      map((data) => {
        console.log(data);
        if(data.success != undefined && data.success === false) {
            response.status(200);
        }

        return data;
      }),
    );
  }
}
