import { Injectable, NotFoundException } from '@nestjs/common';
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

  async emailSearch(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('O email não foi encontrado.');
    return user;
  }

  private async searchUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('Usuario não encontrado');
    }
    return user;
  }

  async listAllUsers() {
    const savedUsers = await this.userRepository.find();
    const userList = savedUsers.map(
      (user) => new UserListDTO(user.id, user.name),
    );
    return userList;
  }

  async createNewUser(userData: UserDTO) {
    const userEntity = new UserEntity();
    Object.assign(userEntity, userData as UserEntity);

    return this.userRepository.save(userEntity);
  }

  async updateUser(id: string, newUserData: UpdatedUserDTO) {
    const user = await this.searchUserById(id);
    Object.assign(user, newUserData as UserEntity);
    return this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
  }
}
