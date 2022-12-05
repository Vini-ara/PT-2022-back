import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateJwtAccesToken(id: string, name: string, is_admin: boolean) {
    const payload = { sub: id, name, is_admin };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return {
      accessToken,
      expiresIn: Number(
        this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      ),
    };
  }

  async generateJwtRefreshToken(id: string, name: string, is_admin: boolean) {
    const payload = { sub: id, name, is_admin };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const cookie = `Refresh=${token}; HttpOnly; SameSite=None; Secure; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;

    return { token, cookie };
  }

  async validateGoogleUser(token: string) {
    try {
      const createUserDto = await this.verifyGoogleToken(token);

      const user = await this.userService.getUser(createUserDto.id);

      if (!user) {
        const createdUser = await this.userService.createUser(createUserDto);

        return createdUser;
      }

      //poderia só retornar o usuário aqui, mas seria uma boa prática atualizar os dados, para ter as informações mais atualizadas

      const { id, ...updateUserDto } = createUserDto;

      const updatedUser = await this.userService.updateUser(id, updateUserDto);

      return updatedUser;
    } catch (error) {
      throw new HttpException('invalid token', 401);
    }
  }

  async verifyGoogleToken(token: string) {
    const client = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: this.configService.get('GOOGLE_CLIENT_ID'),
    });

    const { sub, name, picture } = ticket.getPayload();

    return { id: sub, name, picture };
  }
}
