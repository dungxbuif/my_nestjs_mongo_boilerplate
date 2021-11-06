import { BackendLogger } from './BackendLogger';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LogsMiddleware implements NestMiddleware {
   private readonly logger = new BackendLogger('HTTP');

   use(request: Request, response: Response, next: NextFunction) {
      response.on('finish', () => {
         const { method, originalUrl } = request;
         const { statusCode, statusMessage } = response;

         const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

         if (statusCode >= 200 && statusCode <= 400) this.logger.log(message);
      });

      next();
   }
}

export default LogsMiddleware;
