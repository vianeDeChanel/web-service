import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    if (req.path === '/api-docs' || req.path.startsWith('/api-docs/')) {
      next();
      return;
    }

    const expectedToken = this.configService.get<string>('ACCESS_TOKEN');
    const authHeader = req.headers.authorization;

    if (!expectedToken || !authHeader) {
      throw new UnauthorizedException('Missing authentication token');
    }

    const providedToken = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    if (providedToken !== expectedToken) {
      throw new UnauthorizedException('Invalid authentication token');
    }

    next();
  }
}
