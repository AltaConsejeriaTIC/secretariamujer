import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Home2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html'
})
export class Home2Page {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Home2Page Page');
  }

  registerForm() {
    console.log("se esta registrando");
  }

  goToSignInPage(){

  }


}
