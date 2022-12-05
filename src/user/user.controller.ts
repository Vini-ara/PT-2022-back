import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { EnsureAdminGuard } from 'src/auth/guard/ensure-admin.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(EnsureAdminGuard)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @UseGuards(EnsureAdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('data') updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
