import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ApplicationConfig} from "../config";

@Injectable()
export class CategoryTitles {

  constructor(public http: Http) {

  }

  getTitles(){
    let restUrl=ApplicationConfig.getURL('/category_titles_rest');
    return this.http.get(restUrl);
  }

}
