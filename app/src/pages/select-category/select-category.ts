import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SelectCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html'
})
export class SelectCategoryPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SelectCategoryPage Page');
  }

}
