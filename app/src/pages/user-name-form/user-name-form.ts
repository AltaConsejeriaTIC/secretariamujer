import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the UserNameForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-name-form',
  templateUrl: './user-name-form.html'
})
export class UserNameFormPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello UserNameFormPage Page');
  }

}
