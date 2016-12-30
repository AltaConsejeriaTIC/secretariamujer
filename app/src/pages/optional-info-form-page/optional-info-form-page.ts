import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the OptionalInfoFormPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-optional-info-form-page',
  templateUrl: './optional-info-form-page.html'
})
export class OptionalInfoFormPagePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello OptionalInfoFormPagePage Page');
  }

}
