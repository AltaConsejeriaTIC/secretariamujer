import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {IUser, User} from "../entity/user";

@Injectable()
export class UserFactory {

  constructor() {
  }

  createUser(properties?: {}) {
    let user: IUser = new User();

    for (let property in properties) {
      user[property] = properties[property];
    }

    return user;
  }
}
