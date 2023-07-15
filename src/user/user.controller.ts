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
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UserListDTO } from './dto/UserListDTO.dto';
import { UpdatedUserDTO } from './dto/UpdatedUserDTO.dto';

@Controller('/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: UserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;
    userEntity.id = uuid();

    this.userRepository.saveUser(userEntity);
    return {
      user: new UserListDTO(userEntity.id, userEntity.name),
      message: 'Usuario criado com sucesso!',
    };
  }

  @Get()
  async listUser() {
    const registeredUserList = await this.userRepository.getUserList();
    const userList = registeredUserList.map(
      (user) => new UserListDTO(user.id, user.name),
    );
    return userList;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdatedUserDTO) {
    const updatedUser = await this.userRepository.updateUser(id, newData);

    return {
      user: updatedUser,
      message: 'Usuario atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.userRepository.deleteUser(id);
    return {
      user: user,
      message: 'Usuario removido com sucesso!',
    };
  }
}
