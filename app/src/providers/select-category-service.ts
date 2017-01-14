import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the SelectCategoryService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SelectCategoryService {
  categories:string[];

  constructor() {

  }

  setCategories(categories:string[]){
    this.categories=categories;
  }

  getCategories(){
    return this.categories;
  }

}
