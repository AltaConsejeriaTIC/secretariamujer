import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../entity/user';
import {AlertCreator} from  './alert-creator'

/*
 Generated class for the AdminAPI provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AdminAPI {

  constructor(public http: Http, public alertCreator:AlertCreator) {
  }

  outputPrint() {
    console.log("esta imprimiendo", 9 + 9);
  }

  loginAsAppUser() {
    let name = "app";
    let pass = "app";
    let body = JSON.stringify({name, pass})

    this.http.post('http://192.168.88.246/admin/user/login?_format=json', body).map(res => res.json())
      .subscribe(res => {
          console.log("lo que respondio", res);
          //this.registerUser();
        },
        err => {
          console.log("hubo un error 2", err)
        })
  }

  getusers() {
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization':'Basic '+'YXBwOmFwcA=='}); //Base64Encode name:pass
    let options = new RequestOptions({headers: headers});

    this.http.get('http://192.168.88.246/admin/user/1?_format=json', options).map(res => res.json())
      .subscribe(data => {
          console.log("lo que recibio en get users", data)
        },
        err => {
          console.log("hubo un error en get users", err)
        });
  }

  registerUser(user:User){
    let body = JSON.stringify({
      "name":[{"value":user.name}],
      "mail":[{"value":user.email}],
      "roles":[{"target_id":"authenticated"}],
      "status": [{"value": true}],
      "pass":user.pass,
      "field_cellphone":"313246545"
    });

    let headers = new Headers({'Content-Type': 'application/json', 'Authorization':'Basic '+'YXBwOmFwcA=='});
    let options = new RequestOptions({headers: headers});

    this.http.post('http://192.168.88.245:9000/entity/user?_format=json', body, options).map(res => res.json())
      .subscribe(data => {
          console.log("lo que recibio al crear usuario", data)
          this.alertCreator.showSimpleAlert('Exito','Usuario registrado');
        },
        err => {
          console.log("hubo un error en crear usuario", err);
          console.log(err.json());
          this.proccessEmailError(err.json());

        });
  }

  proccessEmailError(error:any){
    let split=error.message.indexOf("The email address");
    split>=0 ? this.alertCreator.showSimpleAlert('Error','El correo ya existe'): '';
  }

}