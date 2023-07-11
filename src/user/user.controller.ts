import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async criaUsuario(@Body() userData) {
    this.userRepository.saveUser(userData);
    return userData;
  }

  @Get()
  async listUsuarios() {
    return this.userRepository.getUserList();
  }
}
