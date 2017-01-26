import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RequiredInfoFormPage} from "../required-info-form/required-info-form";
import {MenuPage} from "../menu/menu";
import {ContactPage} from "../contact/contact";

@Component({
  selector: 'page-home2',
  templateUrl: './home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

  registerForm() {
    console.log("se esta registrando");
  }

  goToSignInPage() {
    this.navCtrl.push(ContactPage);
    //this.navCtrl.setRoot(MenuPage);
  }

  goToRequiredInfoForm() {
    this.navCtrl.push(RequiredInfoFormPage);
  }
}
