import { Injectable } from '@angular/core';
import { File } from 'ionic-native';
import 'rxjs/add/operator/map';
declare var cordova:any;


@Injectable()
export class OfflineService {
  categoriesTitles:any;
  dataDirectory: string;


  constructor() {
    this.dataDirectory=cordova.file.dataDirectory;
  }

  setOfflineCategoriesTitles(data){
    this.categoriesTitles=data;
  }

  getOfflineCategoriesTitles(){
    return this.categoriesTitles;
  }

  readAsText(fileName:string){
    return File.readAsText(this.dataDirectory,fileName);
  }

}
