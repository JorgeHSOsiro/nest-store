import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private userList: UserEntity[] = [];

  async saveUser(user: UserEntity) {
    this.userList.push(user);
  }

  async getUserList() {
    return this.userList;
  }

  async emailSearch(email: string) {
    const user = this.userList.find((user) => user.email === email);

    return user !== undefined;
  }

  async updateUser(id: string, newData: Partial<UserEntity>) {
    const user = this.searchUserById(id);

    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }
      user[key] = value;
    });
  }

  async deleteUser(id: string) {
    const user = this.searchUserById(id);
    this.userList = this.userList.filter((user) => user.id !== id);
    return user;
  }

  private async searchUserById(id: string) {
    const user = this.userList.find((user) => user.id === id);
    if (!user) {
      throw new Error('Usuario não encontrado');
    }
    return user;
  }
}
