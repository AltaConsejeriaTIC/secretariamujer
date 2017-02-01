import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../entity/user';
import {Observable} from "rxjs";

@Injectable()
export class UserDAO {

  user: User = {pass: null, username: null, name: null, email: null, phone: null};

  constructor(public http: Http) {
  }

  saveRequiredInfo(username: string, pass: string) {
    this.user.username = username;
    this.user.pass = pass;
  }

  setOptionalInfo(user: User) {
    this.user.name = user.name;
    this.user.email = user.email;
    this.user.phone = user.phone;
  }

  create(): Observable<Response> {
    let encodedUserName = this.encodeUsername();
    let encodedEmail = this.encodeEmail();

    let contacts={"contact1":{"name":"brayan1","phoneNumber":"789"}, "contact2":{"name":"kevin1","phoneNumber":"321"} }

    let body = JSON.stringify({
      "name": [{"value": encodedUserName}],
      "mail": [{"value": encodedEmail}],
      "roles": [{"target_id": "authenticated"}],
      "status": [{"value": true}],
      "pass": this.user.pass,
      "field_cellphone": this.user.phone,
      "field_password": this.user.pass,
      "field_full_name": this.user.name,
      //"field_contacts": [{"contact1":{"name":"brayan","phoneNumber":"789"}, "contact2":{"name":"kevin","phoneNumber":"321"} }]
      "field_contacts": JSON.stringify(contacts)
    });

    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ' + 'YXBwOmFwcA=='});
    let options = new RequestOptions({headers: headers});

    return this.http.post('http://192.168.88.245:9000/entity/user?_format=json', body, options);
  }

  encodeUsername(): string {
    return this.user.username + Math.floor(Date.now() / 1000);
  }

  encodeEmail(): string {
    if (!this.user.email) {
      return Math.floor(Date.now() / 1000) + '@noregistra.com';
    } else {
      return this.user.email;
    }
  }

  getUsername(): string {
    return this.user.username;
  }

  getName(): string {
    return this.user.name;
  }

  getPass(): string {
    return this.user.pass;
  }

}
