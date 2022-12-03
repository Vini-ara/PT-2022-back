import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'invalid refrsh',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
