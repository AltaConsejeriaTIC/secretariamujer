import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-select-info-category',
  templateUrl: 'select-info-category.html'
})
export class SelectInfoCategoryPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SelectInfoCategoryPage Page');
  }

}
