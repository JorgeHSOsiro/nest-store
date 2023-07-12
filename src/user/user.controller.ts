import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDTO } from './dto/UserDTO.dto';

@Controller('/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: UserDTO) {
    this.userRepository.saveUser(userData);
    return userData;
  }

  @Get()
  async listUser() {
    return this.userRepository.getUserList();
  }
}
