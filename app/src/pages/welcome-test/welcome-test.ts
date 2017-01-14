import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SelectCategoryService} from "../../providers/select-category-service";
import {SelectCategoryPage} from "../select-category/select-category";

@Component({
  selector: 'page-welcome-test',
  templateUrl: './welcome-test.html'
})
export class WelcomeTestPage {

  constructor(public navCtrl: NavController, public selectCategoyService:SelectCategoryService) {}

  ionViewDidLoad() {
    console.log('Hello WelcomeTestPage Page');
  }

  goToTestSelectTestCategory(){
    this.selectCategoyService.setCategory('tests');
    this.navCtrl.push(SelectCategoryPage);
  }

  goToTips(){

  }

  goToRoutes(){

  }

}
