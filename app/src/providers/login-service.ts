import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {IUser} from "../entity/user";
import {ApplicationConfig} from "../config";

@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }


  login(user:IUser){
    let url = ApplicationConfig.getURL('/user/login?_format=json');

  }

}
