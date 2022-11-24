import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
}
