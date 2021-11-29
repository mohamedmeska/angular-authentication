import { IUser } from "../interfaces/user";

export class UsersModel {
  public users: IUser[];
  constructor() {
    this.users = [
      {
        id: 1,
        userId: 1,
        username: 'meska',
        password: '123'
      }
    ]
  }
}
