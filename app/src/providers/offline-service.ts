import { Injectable } from '@angular/core';
import { File } from 'ionic-native';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Http, Response} from '@angular/http';
import {ApplicationConfig} from "../config";


declare var cordova:any;


@Injectable()
export class OfflineService {
  categoriesTitles:any;
  dataDirectory: string;


  constructor(private http: Http) {
    this.dataDirectory=cordova.file.dataDirectory;
  }


  getAllAppData(){
    return Observable.forkJoin([
      this.http.get(ApplicationConfig.getURL('/category_titles_rest')).map((res:Response) => res.json()),
      this.http.get(ApplicationConfig.getURL('/preguntas-violencia-economica')).map((res:Response) => res.json()),
      this.http.get(ApplicationConfig.getURL('/preguntas-violencia-fisica')).map((res:Response) => res.json()),
      this.http.get(ApplicationConfig.getURL('/preguntas-violencia-psicologica')).map((res:Response) => res.json()),
      this.http.get(ApplicationConfig.getURL('/preguntas-violencia-sexual')).map((res:Response) => res.json()),
      this.http.get(ApplicationConfig.getURL('/economic_violence_tips_rest')).map((res:Response) => res.json()),
      this.http.get(ApplicationConfig.getURL('/physical_violence_tips_rest')).map((res:Response) => res.json()),
      this.http.get(ApplicationConfig.getURL('/psychological_violence_tips_rest')).map((res:Response) => res.json()),
      this.http.get(ApplicationConfig.getURL('/sexual_violence_tips_rest')).map((res:Response) => res.json()),

    ]);
  }

  readAsText(fileName:string){
    return File.readAsText(this.dataDirectory,fileName);
  }

}
