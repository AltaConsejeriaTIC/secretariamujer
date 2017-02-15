import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {IUser, User} from "../entity/user";

@Injectable()
export class UserService {
  user: IUser;

  constructor() {
    this.user = new User();
  }

  clearUserData(){
    this.user.id=null;
    this.user.password=null;
    this.user.username=null;
    this.user.email=null;
    this.user.cellPhone=null;
    this.user.fullName=null;
    this.user.contacts=[];
  }
}
