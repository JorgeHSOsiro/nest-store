import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private adapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);

    const { httpAdapter } = this.adapterHost;

    const context = host.switchToHttp();
    const response = context.getResponse();
    const requisition = context.getRequest();

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(requisition),
            },
          };

    httpAdapter.reply(response, body, status);
  }
}
