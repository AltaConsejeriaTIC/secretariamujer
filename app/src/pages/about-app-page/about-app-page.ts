import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {AppInfo} from "../../entity/app-info";
import {Http} from "@angular/http";
import {ApplicationConfig} from "../../config";
import {AlertCreator} from "../../providers/alert-creator";
import {OfflineService} from "../../providers/offline-service";

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

  constructor(public navCtrl: NavController, public http: Http, public loadingController: LoadingController, public alertCreator: AlertCreator,public offlineService:OfflineService) {
    this.loading = this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  ionViewDidLoad() {
    let url = ApplicationConfig.getURL('/info-about-app-rest');
    this.http.get(url).map(res => res.json()).subscribe(response => {
      this.setInfo(response);
    }, err => {
      this.alertCreator.showSimpleAlert('Info','Recuerda conectarte a internet para obtener la información más reciente');
      this.offlineService.readAsText('aboutApp.txt').then((data)=>{
        this.setInfo(JSON.parse(data.toString()));
      });
    });
  }

  setInfo(data){
    this.aboutAppInfo = data;
    this.loading.dismiss();
    this.checkIfEmptyResponse();
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
