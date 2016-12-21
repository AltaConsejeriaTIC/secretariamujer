import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the AdminAPI provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AdminAPI {

  constructor(public http: Http) {
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

  registerUser(){
    let body = JSON.stringify({
      "name":[{"value":"t"}],
      "mail":[{"value":"t@t.tt"}],
      "roles":[{"target_id":"authenticated"}],
      "status": [{"value": true}],
      "pass":"t",
      "field_cellphone":"313246545"
    });

    let headers = new Headers({'Content-Type': 'application/json', 'Authorization':'Basic '+'YXBwOmFwcA=='});
    let options = new RequestOptions({headers: headers});

    this.http.post('http://localhost/admin/entity/user?_format=json', body, options).map(res => res.json())
      .subscribe(data => {
          console.log("lo que recibio al crear usuario", data)
        },
        err => {
          console.log("hubo un error en crear usuario", err)
        });
  }


}
