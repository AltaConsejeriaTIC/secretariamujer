import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../entity/user';
import {Observable} from "rxjs";

@Injectable()
export class UserDAO {

  user: User =  {pass: null, username: null, name: null, email:null, phone:null};

  constructor(public http: Http) {
  }

  saveRequiredInfo(username: string, pass: string) {
    this.user.username = username;
    this.user.pass = pass;
  }

  saveOptionalInfo(name: string, email:string, phone:string){
    this.user.name=name;
    this.user.email=email;
    this.user.phone=phone;
  }

  create(): Observable<Response> {
    console.log("el usuario registrado es", this.user);
    let encodedUserName=this.encodeUsername();
    let encodedEmail=this.encodeEmail();

    let body = JSON.stringify({
      "name": [{"value": encodedUserName}],
      "mail": [{"value": encodedEmail }],
      "roles": [{"target_id": "authenticated"}],
      "status": [{"value": true}],
      "pass": this.user.pass,
      "field_cellphone": "313246545"
    });

    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ' + 'YXBwOmFwcA=='});
    let options = new RequestOptions({headers: headers});

    return this.http.post('http://192.168.88.245:9000/entity/user?_format=json', body, options);
  }

  encodeUsername():string{
    return this.user.username+Math.floor(Date.now() / 1000);
  }

  encodeEmail():string{
    if(!this.user.email){
      return Math.floor(Date.now() / 1000)+'@noregistra.com';
    }else{
      return this.user.email;
    }
  }

}
