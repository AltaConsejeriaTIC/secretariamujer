import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {IUser, User} from '../entity/user';
import {Observable} from "rxjs";
import {ApplicationConfig} from "../config";

@Injectable()
export class UserDAO {
  user: IUser;
  RESTUrl: string;

  constructor(public http: Http, private config: ApplicationConfig) {
    this.user = new User();
    this.RESTUrl = this.config.getURL('/entity/user?_format=json');
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
    let headers = this.createHeaders();
    let options = this.createRequestOptions(headers);

    return this.http.post(this.RESTUrl, body, options);
  }

  update() {
  }

  private createRequestOptions(headers: Headers) {
    return new RequestOptions({headers: headers});
  }

  private createHeaders() {
    return new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ' + 'YXBwOmFwcA=='});
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
}
