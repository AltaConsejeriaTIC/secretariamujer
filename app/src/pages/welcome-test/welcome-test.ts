import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TestPage} from "../test-page/test-page";

@Component({
  selector: 'page-welcome-test',
  templateUrl: './welcome-test.html'
})
export class WelcomeTestPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello WelcomeTestPage Page');
  }

  goToTestPage(){
    this.navCtrl.push(TestPage);
  }

  goToTips(){

  }

  goToRoutes(){

  }

}
