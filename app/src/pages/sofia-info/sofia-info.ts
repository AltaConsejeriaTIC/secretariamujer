import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SOFIAInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sofia-info',
  templateUrl: './sofia-info.html'
})
export class SOFIAInfoPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {

  }

  goToMenuPage() {
    this.navCtrl.pop();
  }

}
