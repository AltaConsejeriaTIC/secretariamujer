import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-sdmu-info-page',
  templateUrl: 'sdmu-info-page.html'
})
export class SDMUInfoPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {

  }

  goToMenuPage() {
    this.navCtrl.pop();
  }

}
