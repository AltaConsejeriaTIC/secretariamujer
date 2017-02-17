import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {IUser} from "../entity/user";
import {ApplicationConfig} from "../config";
import {UserDAO} from "./user-dao";
import {AlertCreator} from "./alert-creator";
import {UserFactory} from "./user-factory";
import {UserAdapter} from "./adapter/user-adapter";

@Injectable()
export class LoginService {

  constructor(private http: Http, private userDAO: UserDAO, public alertCreator: AlertCreator, private userFactory: UserFactory, private userAdapter: UserAdapter) {
  }

  login(username:string, successCallback:(response)=>void,errorCallback:()=>void) {
    let RESTAddress= ApplicationConfig.getURL('/users_rest/') + username;
    let options = this.createRequestOptions();

    return this.http.get(RESTAddress, options).map(response => response.json()).subscribe(response => {
      let userData= this.userAdapter.adaptUserFromServer(response[0]);
      successCallback(userData);
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
    return new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ' + 'YXBwOmFwcA=='});
  }

  private createRequestOptions() {
    return new RequestOptions({headers: this.createHeaders()});
  }

}
