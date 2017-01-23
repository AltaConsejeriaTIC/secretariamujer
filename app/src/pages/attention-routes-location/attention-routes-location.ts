import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-attention-routes-location',
  templateUrl: './attention-routes-location.html'
})
export class AttentionRoutesLocationPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

  goToMenuPage() {
    this.navCtrl.popToRoot();
  }

}
