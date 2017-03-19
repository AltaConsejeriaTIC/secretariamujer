import {Component} from '@angular/core';
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {SOFIAInfo} from "../../entity/sofia-info";
import {Http} from "@angular/http";
import {ApplicationConfig} from "../../config";
import {AlertCreator} from "../../providers/alert-creator";
import {OfflineService} from "../../providers/offline-service";

@Component({
  selector: 'page-sofia-info',
  templateUrl: './sofia-info.html'
})
export class SOFIAInfoPage {

  aboutSOFIAInfo: SOFIAInfo[] = [{
    title: '',
    title_2: '',
    title_3: '',
    description: '',
  }];
  loading: Loading;

  constructor(public navCtrl: NavController, public http: Http, public loadingController: LoadingController, public alertCreator: AlertCreator, public offlineService:OfflineService) {
    this.loading = this.loadingController.create({
      content: "Espera un momento",
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  ionViewDidLoad() {
    let url = ApplicationConfig.getURL('/info-about-sofia-rest');
    this.http.get(url).map(res => res.json()).subscribe(response => {
      this.setInfo(response);
    }, err => {
      this.alertCreator.showSimpleAlert('Info','Recuerda conectarte a internet para obtener la información más reciente');
      this.offlineService.readAsText('aboutSOFIA.txt').then((data)=>{
        this.setInfo(JSON.parse(data.toString()));
      });
    });
  }

  setInfo(data){
    this.aboutSOFIAInfo = data;
    this.loading.dismiss();
    this.checkIfEmptyResponse();
  }

  checkIfEmptyResponse() {
    if (this.aboutSOFIAInfo.length == 0) {
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
