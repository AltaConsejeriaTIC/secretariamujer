import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {IUser} from "../entity/user";
import {ApplicationConfig} from "../config";
import {ErrorFactory} from "./factory/error-factory";

@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }


  login(user: IUser) {
    let url = ApplicationConfig.getURL('/user/login?_format=json');
    let body = this.createHttpBody(user);
    let options = this.createRequestOptions();

    return this.http.post(url, body, options).map(response => response.json().current_user.uid);
  }


  private handleError(error): void {
    let message = error.json().message;

    if (message.indexOf('mail') > -1) {
      throw ErrorFactory.createError('EmailAlreadyTaken');
    }

    if (message.indexOf('name') > -1) {
      throw ErrorFactory.createError('UsernameAlreadyTaken');
    }
  }

  private createHttpBody(user: IUser) {
    let body = JSON.stringify({
      name: user.username,
      pass: user.password
    });

    return body;
  }

  private createHeaders() {
    return new Headers({'Content-Type': 'application/json'});
  }

  private createRequestOptions() {
    return new RequestOptions({headers: this.createHeaders()});
  }

}
