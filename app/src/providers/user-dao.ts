import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {IUser, User} from '../entity/user';
import {Observable} from "rxjs";

@Injectable()
export class UserDAO {

  user: IUser;

  constructor(public http: Http) {
    this.user = new User();
  }

  saveRequiredInfo(username: string, pass: string) {
    this.user.username = username;
    this.user.password = pass;
  }

  setOptionalInfo(user: IUser) {
    this.user.fullName = user.fullName;
    this.user.email = user.email;
    this.user.cellPhone = user.cellPhone;
  }

  create(): Observable<Response> {
    let body = this.createHttpBody(this.user);
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ' + 'YXBwOmFwcA=='});
    let options = new RequestOptions({headers: headers});

    return this.http.post('http://192.168.88.245:9000/entity/user?_format=json', body, options);
  }


  getUsername(): string {
    return this.user.username;
  }

  getName(): string {
    return this.user.fullName;
  }

  getPass(): string {
    return this.user.password;
  }

  update() {


  }

  createHttpBody(user: User) {
    let body = JSON.stringify({
      name: [{value: user.username}],
      mail: [{value: user.email}],
      roles: [{target_id: 'authenticated'}],
      status: [{value: true}],
      pass: user.password,
      field_cellphone: user.cellPhone,
      field_password: user.password,
      field_full_name: user.fullName,
      field_contacts: JSON.stringify(user.contacts)
    });

    return body;
  }


  encodeUsername(user: User): string {
    return user.username + Math.floor(Date.now() / 1000);
  }

  encodeEmail(user: User): string {
    if (!user.email) {
      return Math.floor(Date.now() / 1000) + '@noregistra.com';
    } else {
      return this.user.email;
    }
  }
}
