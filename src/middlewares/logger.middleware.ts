import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
      const controllerName = req.route?.path || 'Unknown Controller';
      const methodName = req.route?.stack?.[0]?.name || 'Unknown Method';
      console.log(`Handled by: ${controllerName} - Method: ${methodName}`);
      console.log(`Response Status: ${res.statusCode}`);
    });

    next();
  }
}
