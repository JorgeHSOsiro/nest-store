import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDTO } from './dto/UserDTO.dto';
import { UserListDTO } from './dto/UserListDTO.dto';
import { UpdatedUserDTO } from './dto/UpdatedUserDTO.dto';
import { UserService } from './user.service';

@Controller('/usuarios')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() userData: UserDTO) {
    const newUser = await this.userService.createNewUser(userData);
    return {
      user: new UserListDTO(newUser.id, newUser.name),
      message: 'Usuario criado com sucesso!',
    };
  }

  @Get()
  async listUser() {
    const userList = await this.userService.listAllUsers();

    return userList;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdatedUserDTO) {
    const updatedUser = await this.userService.updateUser(id, newData);

    return {
      user: updatedUser,
      message: 'Usuario atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.userService.deleteUser(id);
    return {
      user: user,
      message: 'Usuario removido com sucesso!',
    };
  }
}
