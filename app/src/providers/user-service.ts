import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {IUser, User} from "../entity/user";

@Injectable()
export class UserService {
  user: IUser;

  constructor() {
    this.user = new User();
  }
}
