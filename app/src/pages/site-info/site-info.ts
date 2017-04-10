import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AlertCreator} from "../../providers/alert-creator";
import {ApplicationConfig} from "../../config";
import {InAppBrowser} from "ionic-native";
import {RouteInfo} from "../../entity/route-info";

@Component({
  selector: 'page-site-info',
  templateUrl: 'site-info.html'
})
export class SiteInfoPage {

  site:RouteInfo;
  titlePage: string;

  constructor(public navCtrl: NavController, public  navparams:NavParams, public alertCreator: AlertCreator,) {
    this.site = navparams.get('placeInfo');
    this.titlePage = navparams.get('titlePage');
  }

  ionViewDidLoad() {
  }

  goBackPage(){
    this.navCtrl.pop();
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

  downloadFileListener(id:number){
    if(this.site.file==""){
      this.showNoFileAlert();
    }else{
      this.openBrowser();
    }
  }

  showNoFileAlert(){
    this.alertCreator.showSimpleAlert('Info','No hay archivos para descargar');
  }

  openBrowser(){
    let url=ApplicationConfig.getURL(this.site.file);
    let browser= new InAppBrowser(url, "_system", "location=true");
  }

}
