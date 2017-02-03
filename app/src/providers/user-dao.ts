import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {IUser, User} from '../entity/user';
import {Observable} from "rxjs";
import {ApplicationConfig} from "../config";
import {Contact} from "../entity/contact";

@Injectable()
export class UserDAO {
  user: IUser;

  constructor(public http: Http, private config: ApplicationConfig) {
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

  create(): Observable<any> {
    let restUrl = this.config.getURL('/entity/user?_format=json');
    let body = this.createHttpBody(this.user);
    let headers = this.createHeaders();
    let options = this.createRequestOptions(headers);

    let observable = Observable.create((observer) => {
      this.http.post(restUrl, body, options)
        .map(response => response.json())
        .subscribe((user: any) => {
          observer.next(user.uid[0].value);
          observer.complete();
        }, error => {
          observer.error(error.json());
        });
    });

    return observable;
  }

  update() {
    let restUrl = this.config.getURL('/user/' + this.user.id + '?_format=json');
    let body = this.createHttpBody(this.user);
    let headers = this.createHeaders();
    let options = this.createRequestOptions(headers);

    return this.http.patch(restUrl, body, options).map(response => response.json());
  }

  private createHttpBody(user: User) {
    let body = JSON.stringify({
      name: [{value: user.username}],
      mail: [{value: user.email}],
      roles: [{target_id: 'authenticated'}],
      status: [{value: true}],
      pass: user.password,
      field_cellphone: user.cellPhone,
      field_full_name: user.fullName,
      field_contacts: JSON.stringify(user.contacts)
    });

    return body;
  }

  private createHeaders() {
    return new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ' + 'YXBwOmFwcA=='});
  }


  private createRequestOptions(headers: Headers) {
    return new RequestOptions({headers: headers});
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
}
