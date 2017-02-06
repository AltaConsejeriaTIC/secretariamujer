import { Component } from '@angular/core';
import {NavController, LoadingController, Loading} from 'ionic-angular';
import {Http} from "@angular/http";
import {ApplicationConfig} from "../../config";
import {SDMUInfo} from "../../entity/sdmu-info";
import {AlertCreator} from "../../providers/alert-creator";

@Component({
  selector: 'page-sdmu-info-page',
  templateUrl: 'sdmu-info-page.html'
})
export class SDMUInfoPage {
  aboutSDMUInfo:SDMUInfo[]=[{
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
    let url=this.applicationConfig.getURL('/info-about-sdmu-rest');
    this.http.get(url).map(res => res.json()).subscribe(response => {
      this.aboutSDMUInfo=response;
      this.loading.dismiss();
      this.checkIfEmptyResponse();

      console.log("la respuesta", this.aboutSDMUInfo);
    }, err => {
      this.loading.dismiss();
      this.alertCreator.showSimpleAlert("Error","Asegurate de tener conexión a internet, o intentalo más tarde");
      console.log("el error", err)
    });
  }

  checkIfEmptyResponse(){
    if(this.aboutSDMUInfo.length==0){
      this.alertCreator.showSimpleAlert("Info","No hay información para mostrar");
    }
  }

  goBackPage(){
    this.navCtrl.pop();
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }
}
