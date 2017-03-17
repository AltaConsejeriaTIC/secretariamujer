import {Component} from '@angular/core';
import {NavController, LoadingController, Loading} from 'ionic-angular';
import {Http} from "@angular/http";
import {ApplicationConfig} from "../../config";
import {SDMUInfo} from "../../entity/sdmu-info";
import {AlertCreator} from "../../providers/alert-creator";
import {InfoJsonService} from "../../providers/info-json-service";

@Component({
  selector: 'page-sdmu-info-page',
  templateUrl: 'sdmu-info-page.html'
})
export class SDMUInfoPage {
  aboutSDMUInfo: SDMUInfo[] = [{
    title: '',
    title_2: '',
    title_3: '',
    description: '',
  }];
  loading: Loading;

  constructor(public navCtrl: NavController, public http: Http, public loadingController: LoadingController, public alertCreator: AlertCreator, public infoJsonService: InfoJsonService) {
    this.loading = this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  ionViewDidLoad() {
    let url = ApplicationConfig.getURL('/info-about-sdmu-rest');
    this.http.get(url).map(res => res.json()).subscribe(response => {
      this.aboutSDMUInfo = response;
      this.loading.dismiss();
      this.checkIfEmptyResponse();

      console.log("la respuesta", this.aboutSDMUInfo);
    }, err => {
      this.getOfflineInfo(err);
    });
  }

  getOfflineInfo(err){
    this.loading.dismiss();
    this.infoJsonService.getJson("sdmuInfoJson").then((response) => {
      this.aboutSDMUInfo = response;
    });
    console.log("el error", err);
  }

  checkIfEmptyResponse() {
    if (this.aboutSDMUInfo.length == 0) {
      this.alertCreator.showSimpleAlert("Info", "No hay información para mostrar");
    }
  }

  goBackPage() {
    this.navCtrl.pop();
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }
}
