import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('data') updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
