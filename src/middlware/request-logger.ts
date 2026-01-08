import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    Logger.log(`Headers: ${JSON.stringify(req.headers)}`);
    Logger.log(`Params: ${JSON.stringify(req.params)}`);
    Logger.log(`Query: ${JSON.stringify(req.query)}`);
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      Logger.log(`Body: ${JSON.stringify(req.body)}`);
    }
    next();
  }
}
