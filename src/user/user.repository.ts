import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private userList = [];

  async saveUser(user) {
    this.userList.push(user);
  }

  async getUserList() {
    return this.userList;
  }
}
