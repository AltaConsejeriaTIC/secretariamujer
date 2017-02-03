import { Component } from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {SOFIAInfo} from "../../entity/sofia-info";
import {Http} from "@angular/http";
import {ApplicationConfig} from "../../config";
import {AlertCreator} from "../../providers/alert-creator";

@Component({
  selector: 'page-sofia-info',
  templateUrl: './sofia-info.html'
})
export class SOFIAInfoPage {

  aboutSOFIAInfo:SOFIAInfo[]=[{
    title:'',
    title_2: '',
    title_3: '',
    description: '',
  }];
  loading:Loading;

  constructor(public navCtrl: NavController, public http:Http, public applicationConfig:ApplicationConfig, public loadingController: LoadingController, public alertCreator: AlertCreator) {
    this.loading=this.loadingController.create({
      content:"Espera un momento",
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  ionViewDidLoad() {
    let url=this.applicationConfig.getURL('/info-about-sofia-rest');
    this.http.get(url).map(res => res.json()).subscribe(response => {
      this.aboutSOFIAInfo=response;
      this.loading.dismiss();
      this.checkIfEmptyResponse();

      console.log("la respuesta", this.aboutSOFIAInfo);
    }, err => {
      this.loading.dismiss();
      this.alertCreator.showSimpleAlert("Error","Asegurate de tener conexión a internet, o intentalo más tarde");
      console.log("el error", err)
    });
  }

  checkIfEmptyResponse(){
    if(this.aboutSOFIAInfo.length==0){
      this.alertCreator.showSimpleAlert("Info","No hay información para mostrar");
    }
  }

  goToMenuPage() {
    this.navCtrl.pop();
  }

}
