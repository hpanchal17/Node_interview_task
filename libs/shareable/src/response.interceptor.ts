import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

export function Response(responseDto: any = undefined, message = '') {
  return UseInterceptors(new ResponseInterceptor(responseDto, message));
}

class ResponseInterceptor implements NestInterceptor {
  constructor(private responseDto: any, private message: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          isError: false,
          message: this.message,
          data: this.responseDto
            ? plainToInstance(this.responseDto, data, {
                excludeExtraneousValues: true,
              })
            : {},
        };
      }),
    );
  }
}
