import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {IUser, User} from "../entity/user";

@Injectable()
export class UserService {
  user: IUser;

  constructor() {
    this.user = new User();
  }

  setRequiredInfo(username: string, pass: string) {
    this.user.username = username;
    this.user.password = pass;
  }

  setOptionalInfo(user: IUser) {
    this.user.fullName = user.fullName;
    this.user.email = user.email;
    this.user.cellPhone = user.cellPhone;
  }

}
