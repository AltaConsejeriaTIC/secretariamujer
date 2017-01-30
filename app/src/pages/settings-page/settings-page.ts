import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings-page',
  templateUrl: 'settings-page.html'
})
export class SettingsPage {

  constructor(public navController: NavController) {}

  ionViewDidLoad() {

  }

  goToMenuPage() {
    this.navController.pop();
  }
}
