import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAdminDto } from './dto/updateUserAdmin.dto';
import { UpdateUserArchivedDto } from './dto/updateUserArchived.dto';

const defaultUserResponse = {
  id: true,
  name: true,
  picture: true,
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

  async updateAdmin(id: string, updateAdminArchivedDto: UpdateUserAdminDto) {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateAdminArchivedDto,
      },
      select: {
        ...defaultUserResponse,
      },
    });

    return user;
  }

  async updateArchived(
    id: string,
    updateUserArchivedDto: UpdateUserArchivedDto,
  ) {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserArchivedDto,
      },
      select: {
        ...defaultUserResponse,
      },
    });

    return user;
  }
}
