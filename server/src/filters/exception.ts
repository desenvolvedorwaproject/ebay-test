import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request } from 'express-serve-static-core';
import { logException } from 'log';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status >= 500) {
      exception.errorData = {
        req: {
          method: request.method,
          url: request.originalUrl,
          queryString: request.params,
          body: request.body,
        }
      };

      logException(exception);
    }

    super.catch(exception, host);
  }
}