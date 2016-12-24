import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../entity/user';
import {Observable} from "rxjs";

@Injectable()
export class UserDAO {

  constructor(public http:Http) {
  }

  create(user:User):Observable<Response> {
    let body = JSON.stringify({
      "name": [{"value": user.name}],
      "mail": [{"value": user.email}],
      "roles": [{"target_id": "authenticated"}],
      "status": [{"value": true}],
      "pass": user.pass,
      "field_cellphone": "313246545"
    });

    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Basic ' + 'YXBwOmFwcA=='});
    let options = new RequestOptions({headers: headers});

    return this.http.post('http://192.168.88.245:9000/entity/user?_format=json', body, options);
  }

}
