import { Controller, Get, Param, Post, Patch, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAdminDto } from './dto/updateUserAdmin.dto';
import { UpdateUserArchivedDto } from './dto/updateUserArchived.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    console.log(id);
    return this.userService.getUser(id);
  }

  @Post(':id')
  async createUser(@Param('id') id: string) {
    const user: CreateUserDto = {
      id: '2',
      name: 'bigas',
      picture: 'hello',
    };

    return this.userService.createUser(user);
  }

  @Patch(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateUserAdminDto: UpdateUserAdminDto,
  ) {
    return this.userService.updateAdmin(id, updateUserAdminDto);
  }

  @Patch(':id')
  async updateArchived(
    @Param('id') id: string,
    @Body() updateUserArchivedDto: UpdateUserArchivedDto,
  ) {
    return this.userService.updateArchived(id, updateUserArchivedDto);
  }
}
