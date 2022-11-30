import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class EnsureAdminStrategy extends PassportStrategy(
  Strategy,
  'ensureAdmin',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    if (payload.is_admin) {
      return {
        id: payload.sub,
        name: payload.name,
        is_admin: payload.is_admin,
      };
    } else {
      return null;
    }
  }
}
