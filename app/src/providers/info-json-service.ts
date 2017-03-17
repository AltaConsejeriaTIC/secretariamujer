import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertCreator} from "./alert-creator";

@Injectable()
export class InfoJsonService {

  constructor(public http: Http, public alertCreator: AlertCreator) {

  }


  getJson(fileName): any {
    this.alertCreator.showSimpleAlert("Info", "Asegurate de tener conexión a internet para que se muestre la información actualizada");
    return this.getFile('assets/json-info-section/' + fileName + '.json');

  }

  getFile(url: string) {
    return new Promise(
      resolve => {
        this.http.get(url).map(res => res.json()).subscribe(data => {
            resolve(data);
          },
          err => {
            console.log("Unable to resolve GET promise to url: " + url + "\n ERROR: " + err);
          }
        );
      });
  }

}
