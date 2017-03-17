import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class OfflineService {
  categoriesTitles:any;

  constructor() {

  }

  setOfflineCategoriesTitles(data){
    this.categoriesTitles=data;
  }

  getOfflineCategoriesTitles(){
    return this.categoriesTitles;
  }

}
