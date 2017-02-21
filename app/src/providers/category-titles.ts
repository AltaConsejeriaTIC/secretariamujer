import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApplicationConfig} from "../config";

@Injectable()
export class CategoryTitles {

  constructor(public http: Http) {

  }

  getTitles() {
    let restUrl = ApplicationConfig.getURL('/category_titles_rest');
    return this.http.get(restUrl);
  }

  setTitles(Categories: any, response: any) {
    let responseField = 0;
    let RESTFields = [
      response.field_title_test1,
      response.field_title_test1,
      response.field_title_test1_line_2,
      response.field_title_test2_line_1,
      response.field_title_test2_line_2,
      response.field_title_test3_line_1,
      response.field_title_test3_line_2,
      response.field_title_test4_line_1,
      response.field_title_test4_line_2,
    ];

    for (let testCategory = 0; testCategory < 4; testCategory++) {
      for (let testLabel = 0; testLabel < 2; testLabel++) {
        responseField = responseField + 1;
        Categories[testCategory].labels[testLabel] = RESTFields[responseField];
      }
    }

    return Categories;

  }

}


