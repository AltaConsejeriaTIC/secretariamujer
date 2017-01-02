import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class TestsService {

  constructor(public http: Http) {

  }

  getTestQuestions():Observable<Response>{
    return  this.http.get('http://192.168.88.245:9000/order-test-questions?_format=json')
  }

}
