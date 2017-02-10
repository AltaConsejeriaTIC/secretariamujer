import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {IUser, User} from '../entity/user';
import {Observable} from "rxjs";
import {ApplicationConfig} from "../config";
import {ErrorFactory} from "./factory/error-factory";
import {UserService} from "./user-service";
import {UserAdapter} from "./adapter/user-adapter";

@Injectable()
export class UserDAO {
  user: IUser;

  constructor(public http: Http, private userService: UserService, private userAdapter: UserAdapter) {
    this.user = new User();
  }

  get(userId: string) {
    let restUrl = ApplicationConfig.getURL('/user/' + userId + '?_format=json');
    let options = this.createRequestOptions();

    return this.http.get(restUrl, options)
      .map(response => {
        return this.userAdapter.adaptUserFromServer(response.json())
      });
  }

  create(): Observable<any> {
    let restUrl = ApplicationConfig.getURL('/entity/user?_format=json');
    let body = this.createHttpBody(this.userService.user);
    let options = this.createRequestOptions();

    let observable = Observable.create((observer) => {
      this.http.post(restUrl, body, options)
        .map(response => response.json())
        .subscribe((user: any) => {
          observer.next(user.uid[0].value);
          observer.complete();
        }, error => {
          observer.error(this.handleError(error));
        });
    });

    return observable;
  }

  update() {
    let restUrl = ApplicationConfig.getURL('/user/' + this.userService.user.id + '?_format=json');
    let body = this.createHttpBody(this.userService.user);
    let options = this.createRequestOptions();

    return this.http.patch(restUrl, body, options).map(response => response.json());
  }

  private handleError(error): Error {
    let message = error.json().message;

    if (message.indexOf('mail') > -1) {
      return ErrorFactory.createError('EmailAlreadyTaken');
    }

    if (message.indexOf('name') > -1) {
      return ErrorFactory.createError('UsernameAlreadyTaken');
    }
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

  private createRequestOptions() {
    return new RequestOptions({headers: this.createHeaders()});
  }

  private createHeaders() {
    return new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ' + 'YXBwOmFwcA=='});
  }
}
