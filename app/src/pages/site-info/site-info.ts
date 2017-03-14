import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SiteInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-site-info',
  templateUrl: 'site-info.html'
})
export class SiteInfoPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SiteInfoPage Page');
  }

}
