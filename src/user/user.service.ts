import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

const defaultUserResponse = {
  id: true,
  name: true,
  picture: true,
  is_admin: true,
};

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        picture: true,
        is_admin: true,
        archived: true,
        pdi_updated_at: true,
        answer: {
          select: {
            id: true,
            questionId: true,
            content: true,
            updatedAt: true,
          },
        },
      },
    });

    return user;
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        picture: true,
        is_admin: true,
        pdi_updated_at: true,
      },
    });

    return users;
  }

  async createUser(createUserDto: CreateUserDto) {
    const users = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        pdi_updated_at: new Date(),
      },
      select: {
        ...defaultUserResponse,
      },
    });

    return users;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
      select: {
        ...defaultUserResponse,
      },
    });

    return user;
  }

  async updateRefreshToken(id: string, token: string) {
    const hashedToken = await bcrypt.hash(token, 10);

    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        refreshToken: hashedToken,
      },
      select: {
        ...defaultUserResponse,
      },
    });

    const res = {
      id: user.id,
      name: user.name,
      is_admin: user.is_admin,
    };

    return res;
  }

  async verifyRefreshToken(id: string, token: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    if (
      !user?.refreshToken ||
      !(await bcrypt.compare(token, user.refreshToken))
    ) {
      throw new UnauthorizedException();
    }

    const res = {
      id: user.id,
      name: user.name,
      is_admin: user.is_admin,
    };

    return res;
  }

  async removeRefreshToken(id: string) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        refreshToken: null,
      },
    });

    const res = {
      id: user.id,
      name: user.name,
      is_admin: user.is_admin,
    };

    return res;
  }
}
