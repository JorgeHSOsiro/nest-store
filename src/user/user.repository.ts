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

  async emailSearch(email: string) {
    const user = this.userList.find((user) => user.email === email);

    return user !== undefined;
  }
}
