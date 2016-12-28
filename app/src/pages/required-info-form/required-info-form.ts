import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the RequiredInfoForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-required-info-form',
  templateUrl: 'required-info-form.html'
})
export class RequiredInfoFormPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello RequiredInfoFormPage Page');
  }

}
