import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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

  @Post(':id')
  async create(@Param('id') id: string) {
    const user: CreateUserDto = {
      id: '2',
      name: 'bigas',
      picture: 'hello',
    };

    return this.userService.createUser(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
