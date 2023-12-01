import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp();
    const request = host.getRequest<Request>();

    const user = request['user'];

    if (!user) {
      console.log('User not authenticated, access denied.');
      throw new UnauthorizedException();
    }

    console.log('User is authenticated, access allowed.');

    return true;
  }
}
