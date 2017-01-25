import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RequiredInfoFormPage} from "../required-info-form/required-info-form";
import {MenuPage} from "../menu/menu";
import {ContactPage} from "../contact/contact";

/*
  Generated class for the Home2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home2',
  templateUrl: './home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

  registerForm() {
    console.log("se esta registrando");
  }

  goToSignInPage(){
    this.navCtrl.push(ContactPage);
    //this.navCtrl.setRoot(MenuPage);
  }

  goToRequiredInfoForm(){
    this.navCtrl.push(RequiredInfoFormPage);
  }
}
