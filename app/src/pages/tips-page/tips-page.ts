import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tips-page',
  templateUrl: 'tips-page.html'
})
export class TipsPage {

  tipsClass:string = "";

  constructor(public navController: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.tipsClass = "economic-violence-style";
  }

  goToMenuPage() {
    this.navController.popToRoot();
  }

}
