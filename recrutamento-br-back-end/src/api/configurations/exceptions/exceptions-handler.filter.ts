import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '../../../core/domain/exceptions/domain.exception';

@Catch(HttpException)
export class ExceptionsHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message = 'erro!';
    
    console.log(exception);
    
    if (exception instanceof DomainException) {
      message = exception.message;
    }

    response
      .status(status)
      .json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}