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

  login(user: IUser, successCallback:(data)=>void, errorCallback:()=>void) {
    let url = ApplicationConfig.getURL('/user/login?_format=json');
    let body = this.createHttpBody(user);
    let options = this.createRequestOptions();

    return this.http.post(url, body, options).map(response => response.json()).subscribe(userId => {
      this.userDAO.CSRF_TOKEN = userId.csrf_token;

      this.userDAO.get(userId.current_user.uid).subscribe(user => {
        successCallback(user);
      }, error => {
        console.log(error);
        errorCallback();
        this.alertCreator.showCofirmationMessage('Error', 'No fue posible obtener la informacion del usuario, intenta mas tarde');
      });
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
