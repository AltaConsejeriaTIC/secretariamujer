import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about-app-page',
  templateUrl: 'about-app-page.html'
})
export class AboutAppPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {

  }

  goToMenuPage() {
    this.navCtrl.pop();
  }
}
