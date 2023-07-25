import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserListDTO } from './dto/UserListDTO.dto';
import { UpdatedUserDTO } from './dto/UpdatedUserDTO.dto';
import { UserDTO } from './dto/UserDTO.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async listAllUsers() {
    const savedUsers = await this.userRepository.find();
    const userList = savedUsers.map(
      (user) => new UserListDTO(user.id, user.name),
    );
    return userList;
  }

  async createNewUser(userData: UserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;

    return this.userRepository.save(userEntity);
  }

  async updateUser(id: string, userEntity: UpdatedUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}
