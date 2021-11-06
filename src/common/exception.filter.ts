import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { isObject } from 'util';
import { INTERNAL_SERVER_ERROR } from './error.message';
import { BackendLogger } from './logger/BackendLogger';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
   private readonly logger = new BackendLogger(ExceptionsFilter.name);

   catch(exception: HttpException | Error, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse();
      const req = ctx.getRequest();
      if (exception instanceof HttpException) {
         const errRes = exception.getResponse();
         const status = exception.getStatus();

         this.logger.error(
            isObject(errRes) ? JSON.stringify(errRes) : exception.message,
            exception.stack,
         );

         return res.status(status).json(
            isObject(errRes)
               ? errRes
               : {
                    statusCode: exception.getStatus(),
                    message: exception.message,
                 },
         );
      }

      this.logger.error(exception.message, exception.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
         message: INTERNAL_SERVER_ERROR,
      });
   }
}
