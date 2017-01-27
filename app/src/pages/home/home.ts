import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RequiredInfoFormPage} from "../required-info-form/required-info-form";
import {MenuPage} from "../menu/menu";

@Component({
  selector: 'page-home',
  templateUrl: './home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
  }

  registerForm() {
  }

  goToSignInPage() {
    this.navCtrl.setRoot(MenuPage);
  }

  goToRequiredInfoForm() {
    this.navCtrl.push(RequiredInfoFormPage);
  }
}
