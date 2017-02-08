import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {AppInfo} from "../../entity/app-info";
import {Http} from "@angular/http";
import {ApplicationConfig} from "../../config";
import {AlertCreator} from "../../providers/alert-creator";

@Component({
  selector: 'page-about-app-page',
  templateUrl: './about-app-page.html'
})
export class AboutAppPage {

  aboutAppInfo: AppInfo[] = [{
    title: '',
    title_2: '',
    title_3: '',
    description: '',
  }];
  loading: Loading;

  constructor(public navCtrl: NavController, public http: Http, public loadingController: LoadingController, public alertCreator: AlertCreator) {
    this.loading = this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  ionViewDidLoad() {
    let url = ApplicationConfig.getURL('/info-about-app-rest');
    this.http.get(url).map(res => res.json()).subscribe(response => {
      this.aboutAppInfo = response;
      this.loading.dismiss();
      this.checkIfEmptyResponse();

      console.log("la respuesta", this.aboutAppInfo);
    }, err => {
      this.loading.dismiss();
      this.alertCreator.showSimpleAlert("Error", "Asegurate de tener conexión a internet, o intentalo más tarde");
      console.log("el error", err)
    });
  }

  checkIfEmptyResponse() {
    if (this.aboutAppInfo.length == 0) {
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
