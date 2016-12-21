import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController} from "ionic-angular";


/*
  Generated class for the AlertCreator provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertCreator {

  constructor(public http: Http, private alertCtrl: AlertController) {
    console.log('Hello AlertCreator Provider');
  }

  showSimpleAlert(title:string, message:string){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
