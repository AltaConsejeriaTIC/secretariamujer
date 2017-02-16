import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {IUser} from "../entity/user";
import {ApplicationConfig} from "../config";
import {UserDAO} from "./user-dao";
import {AlertCreator} from "./alert-creator";

@Injectable()
export class LoginService {

  constructor(private http: Http, private userDAO: UserDAO, public alertCreator: AlertCreator) {
  }

  login(username:string, successCallback:(response)=>void,errorCallback:()=>void) {
    let RESTAddress= ApplicationConfig.getURL('/users_rest/') + username;

    return this.http.get(RESTAddress).map(response => response.json()).subscribe(response => {
      console.log("la respuesta", response);

      successCallback(response);
    }, error => {
      console.log(error);
      errorCallback();
      this.alertCreator.showSimpleAlert('Error', 'Usuario y/o contraseña incorrectos');
    });
  }

  logout(){
    return this.http.get(ApplicationConfig.getURL('/?q=user/logout'));
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
