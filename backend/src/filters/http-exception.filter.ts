import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

export const getErrorMessage = <T>(exception: T): string => {
  return exception instanceof HttpException
    ? exception.message
    : String(exception);
};

export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    this.logger.error(exception);
    const status = exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    if (status === HttpStatus.BAD_REQUEST) {
      if (Array.isArray(exception['response']['message'])) {
        const [errorMessage] = exception['response']['message'];
        message = errorMessage;
      } else {
        message = exception['response']['message'] || exception['response'];
      }
    }

    response.status(status).json({
      status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
