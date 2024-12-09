import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const handler = context.getHandler();
    const controller = context.getClass();

    const method = request.method;
    const url = request.url;

    console.log(`Incoming Request: ${method} ${url}`);
    console.log(`Handled by: ${controller.name} - Method: ${handler.name}`);

    return next.handle().pipe(
      tap(() => {
        console.log(`Response Status: ${response.statusCode}`);
        console.log('\n');
      }),
    );
  }
}
