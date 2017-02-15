import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController} from "ionic-angular";


@Injectable()
export class AlertCreator {

  constructor(public http: Http, private alertCtrl: AlertController) {
  }

  showSimpleAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  showCofirmationMessage(title: string, message: string, successHandler?: any) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'Aceptar',
          handler: successHandler
        }
      ]
    });

    alert.present();
  }

  showSelectMessage(title: string, message: string, acceptHandler: any, cancelHandler: any){
    let alert = this.alertCtrl.create({
      title:title,
      subTitle:message,
      buttons:[
        {
          text:'Aceptar',
          handler:acceptHandler
        },
        {
          text:'Cancelar',
          handler:cancelHandler
        }
      ]
    });
    alert.present();
  }

}
